'use client';

import { useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import { MdVerified } from "react-icons/md";
import Link from 'next/link';

export default function LikesModal({ isOpen, toggleModal, publicationId }) {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [followStatus, setFollowStatus] = useState({});

  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const response = await axios.get('/api/auth/user-info');
        setCurrentUserId(response.data.userId);
      } catch (error) {
        console.error('Error obteniendo el ID del usuario:', error);
      }
    };

    fetchCurrentUserId();
  }, []);

  useEffect(() => {
    const fetchLikes = async () => {
      if (!publicationId || !isOpen || !currentUserId) return;

      try {
        setLoading(true);
        const response = await axios.get(`/api/publication/${publicationId}/likes`);
        const likesData = response.data.likes || [];
        setLikes(likesData);

        const newFollowStatus = {};
        for (const user of likesData) {
          if (user._id !== currentUserId) {
            const userDetails = await axios.get(`/api/user/${user._id}`);
            newFollowStatus[user._id] = userDetails.data.followers.includes(currentUserId);
          }
        }
        setFollowStatus(newFollowStatus);
      } catch (error) {
        console.error('Error al obtener likes o estado de seguimiento:', error);
        setLikes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, [publicationId, isOpen, currentUserId]);

  const handleFollowToggle = async (userId) => {
    try {
      if (followStatus[userId]) {
        await axios.post(`/api/followers/dejar-seguir/${userId}`);
        setFollowStatus(prev => ({ ...prev, [userId]: false }));
      } else {
        await axios.post(`/api/followers/seguir/${userId}`);
        setFollowStatus(prev => ({ ...prev, [userId]: true }));
      }
    } catch (error) {
      console.error('Error al actualizar el estado de seguimiento:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-1 sm:px-0">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Me gusta</h3>
          <button
            onClick={toggleModal}
            className="text-gray-800 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="overflow-y-auto max-h-[60vh] p-4">
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="flex flex-row gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-500 animate-bounce [animation-delay:.7s]"></div>
                <div className="w-5 h-5 rounded-full bg-blue-500 animate-bounce [animation-delay:.3s]"></div>
                <div className="w-5 h-5 rounded-full bg-blue-500 animate-bounce [animation-delay:.7s]"></div>
              </div>
            </div>
          ) : likes.length === 0 ? (
            <p className="text-center text-gray-500 py-4">Aún no hay likes en esta publicación</p>
          ) : (
            likes.map((user) => (
              <div key={user._id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center">
                  <Link href={`/client/userprofile/${user._id}`} className="flex items-center">
                    <img
                      src={user.profilePicture || "https://res.cloudinary.com/dbgj8dqup/image/upload/v1725640005/uploads/ktsngfmjvjv094hygwsu.png"}
                      alt={`${user.name} ${user.apellido}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <div className="flex items-center">
                        <span className="font-medium text-sm">{user.name} {user.apellido}</span>
                        {user.isVerified && (
                          <MdVerified
                            className="text-blue-500 ml-1 text-sm"
                            title="Cuenta verificada"
                          />
                        )}
                      </div>
                    </div>
                  </Link>

                </div>

                {user._id !== currentUserId && (
                  <button
                    onClick={() => handleFollowToggle(user._id)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition ${followStatus[user._id]
                        ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                  >
                    {followStatus[user._id] ? 'Siguiendo' : 'Seguir'}
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
