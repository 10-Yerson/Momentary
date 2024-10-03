'use client';

import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios'; // Ajusta la ruta de tu archivo axios
import { useContext } from 'react';
import { MyContext } from '../../context/MyContext';
import { toast } from 'react-toastify';
import Link from 'next/link';

const NotFriends = () => {
  const [noFriends, setNoFriends] = useState(null); // Cambiar el valor inicial de [] a null
  const [loading, setLoading] = useState(true); // Estado de cargando
  const { toggle, setToggle } = useContext(MyContext);
  const [sentRequests, setSentRequests] = useState({}); // Estado para manejar solicitudes enviadas

  useEffect(() => {
    const fetchNoFriends = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/FriendRequest/no-amigos');
        setNoFriends(response.data);
      } catch (error) {
        toast.error('Error al obtener usuarios no amigos');
      } finally {
        setLoading(false); // Cambia el estado a no cargando cuando termine la petición
      }
    };

    fetchNoFriends();
  }, [toggle]);

  const handleSendRequest = async (userId) => {
    try {
      setLoading(true);
      await axios.post(`/api/FriendRequest/solicitud/${userId}`);
      toast.success('Solicitud enviada');

      // Cambia el estado local para reflejar que la solicitud fue enviada
      setSentRequests((prevSentRequests) => ({
        ...prevSentRequests,
        [userId]: true,
      }));
    } catch (error) {
      toast.error('Error al enviar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-1/2 p-4">
      <h2 className="text-lg font-semibold mb-4">Usuarios no amigos</h2>

      {/* Mostrar mensaje de cargando mientras se realiza la petición */}
      {loading ? (
        <div class="flex-col gap-4 w-full flex items-center justify-center h-full">
          <div
            class="w-24 h-24 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
          >
            <div
              class="w-20 h-20 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
            ></div>
          </div>
        </div>

      ) : noFriends && noFriends.length > 0 ? (
        // Si hay usuarios disponibles, los muestra
        <ul>
          {noFriends.map((user) => (
            <li key={user._id} className="flex justify-between items-center mb-4 p-2 border-b border-gray-200">
              <div className="flex items-center">
              <Link href={`/client/userprofile/${user._id}`} className="flex items-center">
                <img
                  src={user.profilePicture || '/default-profile.png'} // Mostrar imagen por defecto si no hay una foto de perfil
                  alt="Foto de perfil"
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p>{user.name} {user.apellido}</p>
                </div>
              </Link>
              </div>
              <button
                className={`px-4 py-2 ${sentRequests[user._id] ? 'bg-gray-500 cursor-default' : 'bg-blue-500 hover:bg-blue-700'} text-white rounded`}
                onClick={() => handleSendRequest(user._id)}
                disabled={sentRequests[user._id] || loading} // Deshabilita el botón si ya se envió la solicitud o si está cargando
              >
                {sentRequests[user._id] ? 'Solicitud enviada' : 'Enviar solicitud'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        // Si no hay usuarios no amigos, muestra este mensaje
        <p>No hay usuarios disponibles para enviar solicitudes de amistad.</p>
      )}
    </div>
  );
};

export default NotFriends;
