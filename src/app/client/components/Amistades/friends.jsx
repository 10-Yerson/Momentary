'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../../../utils/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserFriends, FaUserCircle } from 'react-icons/fa';

export default function Amigos() {
  const [followers, setFollowers] = useState([]); // Lista de seguidores
  const [following, setFollowing] = useState([]); // Lista de seguidos
  const [loading, setLoading] = useState(true); // Estado de carga
  const router = useRouter();

  // Cargar la lista de seguidores y seguidos
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        setLoading(true); // Iniciar la carga
        const [followersResponse, followingResponse] = await Promise.all([
          axios.get(`/api/followers/seguidores/${userId}`), // Petición para obtener seguidores
          axios.get(`/api/followers/seguidos/${userId}`) // Petición para obtener seguidos
        ]);
        setFollowers(followersResponse.data); // Actualizar estado con los seguidores obtenidos
        setFollowing(followingResponse.data); // Actualizar estado con los seguidos obtenidos
      } catch (error) {
        toast.error('Error al cargar la lista de usuarios');
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    fetchUsers(); // Llamar a la función de carga
  }, []);

  // Redirigir al perfil del amigo
  const handleViewProfile = (userId) => {
    router.push(`/client/userprofile/${userId}`); // Navegar al perfil
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer />

      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">
          <FaUserFriends className="inline-block mr-2 text-blue-600" /> Mis Seguidores y Seguidos
        </h1>
        <span className="text-lg text-gray-600">
          {followers.length > 0 || following.length > 0 ? `${followers.length + following.length} usuarios` : 'Sin seguidores ni seguidos todavía'}
        </span>
      </div>

      {/* Mostrar cargando o listas de seguidores y seguidos */}
      {loading ? (
        <p className="text-gray-600">Cargando usuarios...</p>
      ) : (
        <>
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Seguidores</h2>
          {followers.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {followers.map((follower) => (
                <li key={follower._id} className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                  <div className="flex items-center">
                    {follower.profilePicture ? (
                      <img
                        src={follower.profilePicture}
                        alt="Foto de perfil"
                        className="w-16 h-16 rounded-full mr-4 object-cover border border-gray-200 shadow-sm"
                      />
                    ) : (
                      <FaUserCircle className="w-16 h-16 text-gray-300 mr-4" />
                    )}
                    <div>
                      <p className="text-xl font-semibold text-gray-800">{follower.name}</p>
                    </div>
                  </div>
                  <button 
                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-md transition-all duration-300"
                    onClick={() => handleViewProfile(follower._id)} // Navegar al perfil
                  >
                    Ver perfil
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No tienes seguidores.</p>
          )}

          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Siguiendo</h2>
          {following.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {following.map((followed) => (
                <li key={followed._id} className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                  <div className="flex items-center">
                    {followed.profilePicture ? (
                      <img
                        src={followed.profilePicture}
                        alt="Foto de perfil"
                        className="w-16 h-16 rounded-full mr-4 object-cover border border-gray-200 shadow-sm"
                      />
                    ) : (
                      <FaUserCircle className="w-16 h-16 text-gray-300 mr-4" />
                    )}
                    <div>
                      <p className="text-xl font-semibold text-gray-800">{followed.name}</p>
                    </div>
                  </div>
                  <button 
                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-md transition-all duration-300"
                    onClick={() => handleViewProfile(followed._id)} // Navegar al perfil
                  >
                    Ver perfil
                  </button>
                </li>
              ))}
            </ul> 
          ) : (
            <p className="text-gray-600">No sigues a nadie.</p>
          )}
        </>
      )}
    </div>
  );
}
