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
  //const userId = localStorage.getItem('userId');
  const [userId, setUserId] = useState(null);

  // Obtener el userId de localStorage al montar el componente
  useEffect(() => {
    const id = localStorage.getItem('userId');
    setUserId(id);
  }, []);

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

  // Manejar el "like" y "unlike" de una publicación
  const handleLike = async (publicationId, liked) => {
    // Obtener el userId desde localStorage
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error("No se encontró el userId en localStorage");
      return;
    }

    try {
      if (liked) {
        // Eliminar el like
        await axios.post(`/api/publication/${publicationId}/unlike`, { userId });
      } else {
        // Agregar el like
        await axios.post(`/api/publication/${publicationId}/like`, { userId });
      }

      // Actualizar el estado local después de dar o quitar like
      setPublications((prevPublications) =>
        prevPublications.map((publication) =>
          publication._id === publicationId
            ? {
              ...publication,
              likes: liked
                ? publication.likes.filter((id) => id !== userId) // Eliminar like
                : [...(Array.isArray(publication.likes) ? publication.likes : []), userId] // Agregar like
            }
            : publication
        )
      );
    } catch (error) {
      if (error.response) {
        console.error('Error al manejar el like:', error.response.status, error.response.data);
      } else {
        console.error('Error al manejar el like:', error.message);
      }
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center md:w-1/2 w-full pt-10">
        <div
          className="w-16 h-16 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"
        ></div>

      </div>
    );
  }

  return (
    <div className="">
      {message && <p className="text-center text-gray-500 pt-10 text-1xl">{message}</p>}
      {!message && publications.length > 0 ? (
        publications.map((publication) => {
          const liked = Array.isArray(publication.likes) && publication.likes.includes(userId);

          //const liked = publication.likes.includes(userId); // Verificar si el usuario ha dado like
          return (
            <div key={publication._id} className="px-2 rounded-lg my-2">
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

              {/* {publication.image && (
                <img onDoubleClick={() => handleLike(publication._id, liked)}
                  src={publication.image}
                  alt="Imagen de la publicación"
                  className="w-full h-96 object-cover rounded-lg"
                />
              )} */}
              <div className="w-full">
                <img onDoubleClick={() => handleLike(publication._id, liked)} // Manejar doble clic para dar "like"
                  src={publication.image} alt="Publication" className="w-full object-cover rounded-lg" />
              </div>

              <div className="flex items-center justify-between px-5 py-2">
                <div className="flex space-x-4">
                  {/* Botón de Like */}
                  <button
                    className="focus:outline-none"
                    onClick={() => handleLike(publication._id, liked)}
                    disabled={loading} // Deshabilitar el botón mientras se envía la solicitud
                  >
                    <img
                      src={liked ? "/img/icons/corazon.png" : "/img/icons/me-gusta.png"}
                      alt="Like"
                      className="w-6 h-6 object-cover"
                    />
                  </button>

                  {/* Botón de Comentario */}
                  <button className="focus:outline-none">
                    <img
                      src="/img/icons/comentario.png"
                      alt="Comment"
                      className="w-7 h-7 object-cover"
                    />
                  </button>
                </div>
                {/* Botón de Guardar */}
                <button className="focus:outline-none">
                  <img
                    src="/img/icons/guardar-instagram.png"
                    alt="Save"
                    className="w-6 h-6"
                  />
                </button>
              </div>

              {/* Contador de likes */}
              <div className="px-4 pb-2">
                <p className="text-sm font-semibold mb-1">
                  {Array.isArray(publication.likes) ? publication.likes.length.toLocaleString() : '0'} Me gusta
                </p>
              </div>
            </div>
          );
        })
      ) : (
        !message && <p className="text-center text-gray-500 pt-10 text-1xl">No hay publicaciones de este usuario.</p>
      )}
      <ToastContainer />
    </div>
  );
}
