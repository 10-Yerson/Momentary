'use client';

import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios'; // Ajusta la ruta de tu archivo axios
import { useContext } from 'react';
import { MyContext } from '../../context/MyContext';
import { toast } from 'react-toastify';
import Link from 'next/link';

const UsersToFollow = () => {
  const [users, setUsers] = useState(null); // Cambiar el valor inicial de [] a null
  const [loading, setLoading] = useState(true); // Estado de cargando
  const { toggle, setToggle } = useContext(MyContext);
  const [following, setFollowing] = useState({}); // Estado para manejar a quién ya estás siguiendo

  useEffect(() => {
    const fetchUsersToFollow = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/followers/sugerencias');
        setUsers(response.data);
      } catch (error) {
        toast.error('Error al obtener usuarios para seguir');
      } finally {
        setLoading(false); // Cambia el estado a no cargando cuando termine la petición
      }
    };

    fetchUsersToFollow();
  }, [toggle]);

  // Función para seguir a un usuario
  const handleFollowUser = async (userId) => {
    try {
      setLoading(true);
      await axios.post(`/api/followers/seguir/${userId}`);
      toast.success('Has comenzado a seguir a este usuario');
      
      // Actualiza el estado local para reflejar que ahora estás siguiendo al usuario
      setFollowing((prevFollowing) => ({
        ...prevFollowing,
        [userId]: true,
      }));
    } catch (error) {
      toast.error('Error al seguir al usuario');
    } finally {
      setLoading(false);
    }
  };

  // Función para dejar de seguir a un usuario
  const handleUnfollowUser = async (userId) => {
    try {
      setLoading(true);
      await axios.post(`/api/followers/dejar-seguir/${userId}`);
      toast.success('Has dejado de seguir a este usuario');
      
      // Actualiza el estado local para reflejar que has dejado de seguir al usuario
      setFollowing((prevFollowing) => ({
        ...prevFollowing,
        [userId]: false,
      }));
    } catch (error) {
      toast.error('Error al dejar de seguir al usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 p-4">
      <h2 className="text-lg font-semibold mb-4">Usuarios para seguir</h2>
      {loading ? (
        <div className="flex-col gap-4 flex items-center justify-center h-full w-full">
          <div className="w-24 h-24 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
            <div className="w-20 h-20 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
          </div>
        </div>
      ) : users && users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user._id} className="flex justify-between items-center mb-4 p-2 border-b border-gray-200">
              <div className="flex items-center">
                <Link href={`/client/userprofile/${user._id}`} className="flex items-center">
                  <img
                    src={user.profilePicture || '/default-profile.png'}
                    alt="Foto de perfil"
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <p>{user.name} {user.apellido}</p>
                  </div>
                </Link>
              </div>
              <button
                className={`px-4 py-2 ${following[user._id] ? 'bg-gray-500 cursor-default' : 'bg-blue-500 hover:bg-blue-700'} text-white rounded`}
                onClick={() => following[user._id] ? handleUnfollowUser(user._id) : handleFollowUser(user._id)}
                disabled={loading}
              >
                {following[user._id] ? 'Siguiendo' : 'Seguir'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios disponibles para seguir.</p>
      )}
    </div>
  );
};

export default UsersToFollow;
