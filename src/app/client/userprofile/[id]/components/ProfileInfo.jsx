'use client';

import { useState, useEffect } from 'react';
import axios from '../../../../../utils/axios';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
Modal.setAppElement('body');
import { useParams } from 'next/navigation';

export default function InfoProfile() {
  const { id } = useParams(); // Obtener el ID del usuario desde la URL
  const [user, setUser] = useState(null);
  const [sentRequests, setSentRequests] = useState(false); // Para verificar si ya se envió la solicitud
  const [loading, setLoading] = useState(false); // Estado para el indicador de carga

  // Función para obtener los detalles del usuario y verificar si la solicitud ya ha sido enviada
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/user/${id}`);
        setUser(response.data);

        // Verificar si la solicitud ya fue enviada previamente
        const friendRequestStatus = await axios.get(`/api/FriendRequest/status/${id}`);
        setSentRequests(friendRequestStatus.data.sent); // Actualiza el estado basado en la respuesta de la API
      } catch (error) {
        toast.error('Error al cargar la información del usuario');
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  // Función para manejar el envío de la solicitud de amistad
  const handleSendRequest = async (userId) => {
    try {
      setLoading(true); // Activar el estado de carga
      await axios.post(`/api/FriendRequest/solicitud/${userId}`);
      toast.success('Solicitud enviada');

      // Cambiar el estado para reflejar que la solicitud fue enviada
      setSentRequests(true);
    } catch (error) {
      toast.error('Error al enviar la solicitud');
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <img
          alt="Profile picture"
          className="h-24 w-24 rounded-full border-4 border-white object-cover"
          src={user?.profilePicture || '/default-profile.png'}
        />
      </div>
      <div>
        <p className="text-gray-800 text-2xl">
          {user?.name} <span className="text-gray-600">{user?.apellido}</span>
        </p>

        <div className="flex space-x-2 mt-2">
          {/* Mostrar el botón correcto dependiendo si ya se ha enviado la solicitud */}
          {sentRequests ? (
            <button className="bg-gray-200 px-4 py-2 rounded" disabled>
              Solicitud enviada
            </button>
          ) : (
            <button 
              className="bg-neutral-950 text-white border border-neutral-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md"
              onClick={() => handleSendRequest(id)} // Enviar solicitud al hacer clic
              disabled={loading} // Deshabilitar el botón mientras está cargando
            >
              {loading ? 'Enviando...' : 'Enviar solicitud'}
            </button>
          )}
          <button className="bg-gray-200 px-4 py-2 rounded">Editar perfil</button>
          <button className="bg-gray-200 px-4 py-2 rounded">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
