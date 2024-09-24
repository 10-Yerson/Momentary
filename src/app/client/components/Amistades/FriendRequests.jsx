'use client'
import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios'; // Asegúrate de ajustar la ruta de tu archivo axios
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeRequestId, setActiveRequestId] = useState(null); // Para manejar qué solicitud está activa
  const [processingRequest, setProcessingRequest] = useState({}); // Para rastrear si estamos aceptando o rechazando

  // Función para cargar las solicitudes de amistad
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/FriendRequest/solicitudes');
        setRequests(response.data);
      } catch (error) {
        toast.error('Error al cargar las solicitudes de amistad');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Función para gestionar las solicitudes de amistad (aceptar o rechazar)
  const handleRequestAction = async (id, action) => {
    try {
      setProcessingRequest((prev) => ({ ...prev, [id]: action })); // Mostrar "Aceptando" o "Rechazando"
      await axios.post(`/api/friendRequest/gestionar/${id}`, { accion: action });
      toast.success(`Solicitud de amistad ${action === 'aceptar' ? 'aceptada' : 'rechazada'}`);

      // Actualiza la lista de solicitudes eliminando la solicitud gestionada
      setRequests((prevRequests) => prevRequests.filter((request) => request._id !== id));
    } catch (error) {
      toast.error(`Error al ${action} la solicitud`);
    } finally {
      setProcessingRequest((prev) => ({ ...prev, [id]: null })); // Terminar el procesamiento
    }
  };

  // Función para alternar el menú de respuesta
  const toggleResponseMenu = (id) => {
    setActiveRequestId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="w-1/2 p-4">
      <ToastContainer />
      <h2 className="text-lg font-semibold mb-4">Solicitudes de Amistad</h2>

      {loading ? (
        <p>Cargando solicitudes...</p>
      ) : requests.length > 0 ? (
        <ul>
          {requests.map((request) => (
            <li key={request._id} className="flex justify-between items-center mb-4 p-2 border-b border-gray-200">
              <div className="flex items-center">
                <img
                  src={request.sender.profilePicture || '/default-profile.png'}
                  alt="Foto de perfil"
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p>{request.sender.name} {request.sender.apellido}</p>
                </div>
              </div>
              <div>
                {activeRequestId === request._id ? (
                  <div className="flex">
                    {/* Botón para aceptar la solicitud */}
                    <button
                      onClick={() => handleRequestAction(request._id, 'aceptar')}
                      className={`px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded mr-2 ${processingRequest[request._id] === 'aceptar' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={processingRequest[request._id] === 'aceptar'}
                    >
                      {processingRequest[request._id] === 'aceptar' ? 'Aceptando...' : 'Aceptar'}
                    </button>
                    {/* Botón para rechazar la solicitud */}
                    <button
                      onClick={() => handleRequestAction(request._id, 'rechazar')}
                      className={`px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded ${processingRequest[request._id] === 'rechazar' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={processingRequest[request._id] === 'rechazar'}
                    >
                      {processingRequest[request._id] === 'rechazar' ? 'Rechazando...' : 'Rechazar'}
                    </button>
                  </div>
                ) : (
                  // Botón para abrir el menú de respuesta
                  <button
                    onClick={() => toggleResponseMenu(request._id)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
                  >
                    Responder
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes solicitudes de amistad pendientes.</p>
      )}
    </div>
  );
};

export default FriendRequests;
