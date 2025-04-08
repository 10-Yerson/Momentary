'use client'

import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios'
import Link from 'next/link';
import { MdVerified } from "react-icons/md";

export default function Seguidores({ isOpen, toggleModal }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    const FollowersData = async () => {
      setLoading(true);
      try {
        const userInfoResponse = await axios.get('/api/auth/user-info');
        const userId = userInfoResponse.data.userId;

        if (!userId) {
          throw new Error('ID del usuario no encontrado en la respuesta del servidor');
        }
        const response = await axios.get(`/api/followers/seguidores/${userId}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error cargando datos del usuario');
      } finally {
        setLoading(false);
      }
    };
    FollowersData();
  }, [isOpen]); // Se ejecuta cuando isOpen cambia

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg lg:w-[50%] md:w-[50%] w-[90%] relative">
        <button
          onClick={toggleModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-3xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 sm:text-lg md:text-xl">Mis Seguidores</h2>
        {loading ? (
          <div className="flex justify-center items-center w-1/2">
            <div className="relative flex w-64 animate-pulse gap-2 p-4">
              <div className="h-12 w-12 rounded-full bg-slate-400"></div>
              <div className="flex-1">
                <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
                <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
              </div>
              <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
            </div>
          </div>
        ) : data.length === 0 ? (
          <p className="text-center text-gray-500">No tienes seguidores por ahora, ¡pero seguro que llegarán pronto!</p>
        ) : (
          <div className="mt-4 space-y-4 max-h-[400px] overflow-y-auto">
            {data.map((follower) => (
              <div key={follower._id} className="flex items-center space-x-4 border-b pb-4">
                <Link href={`/client/userprofile/${follower._id}`}>
                  <img
                    src={follower.profilePicture}
                    alt={`${follower.name} ${follower.apellido}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </Link>
                <div>
                  <Link href={`/client/userprofile/${follower._id}`}>
                    <p className="font-semibold text-gray-800 flex items-center gap-x-1">
                      {follower.name} {follower.apellido}
                      {follower.isVerified === true && (
                        <MdVerified
                          className="text-blue-500"
                          title="Cuenta verificada"
                        />
                      )}
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
