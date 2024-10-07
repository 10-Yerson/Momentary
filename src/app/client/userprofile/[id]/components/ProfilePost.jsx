'use client';

import axios from '../../../../../utils/axios';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProfilePost() {
  const { id } = useParams(); // Obtiene el ID del usuario de la URL
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(''); // Estado para el mensaje

  useEffect(() => {
    const fetchUserPublications = async () => {
      try {
        const response = await axios.get(`/api/publication/user/${id}`); // Cambia la URL según tu ruta de publicaciones
        setPublications(response.data); // Actualiza el estado con las publicaciones
        
        // Si hay un mensaje indicando que no sigue al usuario, actualiza el estado del mensaje
        if (response.data.msg) {
          setMessage(response.data.msg);
        } else {
          setMessage(''); // Restablecer el mensaje si hay publicaciones
        }

        setLoading(false);
      } catch (error) {
        setMessage('Error al cargar las publicaciones del usuario'); // Muestra un mensaje de error
        setLoading(false);
      }
    };

    fetchUserPublications();
  }, [id]);

  if (loading) {
    return <div>Cargando publicaciones...</div>; // Muestra un mensaje mientras se cargan las publicaciones
  }

  return (
    <div className="p-4">
    {message && <p className="text-center text-gray-500 pt-10 text-1xl">{message}</p>}
    {!message && publications.length > 0 ? (
      publications.map((publication) => (
        <div key={publication._id} className="p-4 border border-gray-300 rounded-lg shadow-sm my-2">
          <div className="flex items-center space-x-4 mb-2">
            <img
              src={publication.user.profilePicture || 'https://metro.co.uk/wp-content/uploads/2018/09/sei_30244558-285d.jpg?quality=90&strip=all'}
              alt="Perfil"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{publication.user.name}</h3>
              <p className="text-sm text-gray-500">{new Date(publication.createdAt).toLocaleString()}</p>
            </div>
          </div>
          
          <p className="mb-4">{publication.description}</p>
          
          {publication.image && (
            <img
              src={publication.image}
              alt="Imagen de la publicación"
              className="w-full h-96 object-cover rounded-lg"
            />
          )}
          
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">👍 {publication.likes} Likes</p>
            <p className="text-sm text-gray-500">💬 {publication.comments.length} Comentarios</p>
            <p className="text-sm text-gray-500">🔄 {publication.shares} Compartidos</p>
          </div>
        </div>
      ))
    ) : (
      !message && <p className="text-center text-gray-500 pt-10 text-1xl">No hay publicaciones de este usuario.</p>
    )}
    <ToastContainer />
  </div>
  
  );
}
