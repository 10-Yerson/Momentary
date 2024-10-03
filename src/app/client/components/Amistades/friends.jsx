'use client'; // Si estás usando Next.js App Directory
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../../../utils/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserFriends, FaUserCircle } from 'react-icons/fa';

export default function Amigos() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Función para cargar la lista de amigos
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/FriendRequest/amigos');
        setFriends(response.data);
      } catch (error) {
        toast.error('Error al cargar la lista de amigos');
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  // Función para manejar la redirección al perfil del usuario
  const handleViewProfile = (friendId) => {
    router.push(`/client/userprofile/${friendId}`);
  };

  // Función para enviar la solicitud de amistad
  const handleSendRequest = async (userId) => {
    try {
      setLoading(true);
      await axios.post(`/api/FriendRequest/solicitud/${userId}`);
      toast.success('Solicitud enviada');

      // Cambia el estado local para reflejar que la solicitud fue enviada
      setFriends((prevFriends) => [...prevFriends, { _id: userId }]); // Añadir el amigo a la lista
    } catch (error) {
      toast.error('Error al enviar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          <FaUserFriends className="inline-block mr-2" /> Mis Amigos
        </h1>
        <span className="text-lg text-gray-600">
          {friends.length > 0 ? `${friends.length} amigos` : 'Sin amigos todavía'}
        </span>
      </div>

      {/* Mostrar amigos */}
      {loading ? (
        <p className="text-gray-600">Cargando amigos...</p>
      ) : friends.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {friends.map((friend) => (
            <li key={friend._id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center">
                {/* Imagen de perfil o icono */}
                {friend.profilePicture ? (
                  <img
                    src={friend.profilePicture}
                    alt="Foto de perfil"
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-16 h-16 text-gray-300 mr-4" />
                )}
                
                {/* Información del amigo */}
                <div>
                  <p className="text-xl font-semibold text-gray-800">{friend.name} {friend.apellido}</p>
                  <p className="text-sm text-gray-600">Amigo desde: {new Date(friend.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="mt-4 flex justify-between">
                <button 
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg"
                  onClick={() => handleViewProfile(friend._id)} // Redirigir al perfil
                >
                  Ver perfil
                </button>

                {/* Mostrar "Amigos" si ya son amigos, de lo contrario "Enviar solicitud" */}
                {friends.find(f => f._id === friend._id) ? (
                  <span className="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg">
                    Amigos
                  </span>
                ) : (
                  <button 
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg"
                    onClick={() => handleSendRequest(friend._id)} // Enviar solicitud
                  >
                    Enviar solicitud
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No tienes amigos añadidos.</p>
      )}
    </div>
  );
}
