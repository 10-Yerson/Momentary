'use client';

import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios'; // Ajusta la ruta de tu archivo axios
import { useContext } from 'react';
import { MyContext } from '../../../../context/MyProvider';
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
    <div className="w-full md:w-1/2 py-4">
      <form className="flex items-center max-w-lg px-2 pb-6 w-2/3">
        <label className="sr-only">Buscar</label>
        <div className="relative w-full">
          <div
            className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <svg
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
            >
              <path
                d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="currentColor"
              ></path>
            </svg>
          </div>
          <input
            required=""
            placeholder="Buscar..."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="voice-search"
            type="text"
          />
        
        </div>
        <button
          className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white rounded-lg border bg-blue-500 hover:bg-blue-700"
          type="submit"
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="w-4 h-4 me-2"
          >
            <path
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="currentColor"
            ></path></svg>Buscar
        </button>
      </form>

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
        <p className='px-2'>No hay usuarios disponibles para seguir.</p>
      )}
    </div>
  );
};

export default UsersToFollow;
