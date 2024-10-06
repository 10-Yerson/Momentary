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
      {message && <p className="text-center text-gray-500 pt-10 text-1xl">{message}</p>} {/* Muestra el mensaje si existe */}
      {!message && publications.length > 0 ? (
        publications.map((pub) => (
          <div key={pub._id} className="border p-2 my-2 rounded">
            <img src={pub.image} alt="Post" className="w-full h-48 object-cover rounded" />
            <p className="mt-2">{pub.description}</p>
          </div>
        ))
      ) : (
        !message && <p className="text-center text-gray-500 pt-10 text-1xl">No hay publicaciones de este usuario.</p>
      )}
      <ToastContainer />
    </div>
  );
}
