'use client'

import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios'
import Link from 'next/link';

export default function Seguidos({ OpenIS, Modaltoggle }) {

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!OpenIS) return;

    const FollowersData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('ID del usuario no encontrado en localStorage');
        }
        const response = await axios.get(`/api/followers/seguidos/${userId}`);
        setData(response.data);
        console.log('Seguidos ', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error cargando datos del usuario');
      }
    };
    FollowersData();
  }, [OpenIS]);

  if (!OpenIS) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg lg:w-[50%] md:w-[50%] w-[90%] relative">
        <button
          onClick={Modaltoggle}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-3xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 sm:text-lg md:text-xl">Seguidos</h2>
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
                  <p className="font-semibold text-gray-800">{follower.name} {follower.apellido}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
