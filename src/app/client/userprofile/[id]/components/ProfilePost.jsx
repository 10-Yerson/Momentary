'use client';

import axios from '../../../../../utils/axios';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SavePublication from '@/app/client/components/Perfil/guardado';
import ModalComment from './comentario';
import { MdVerified } from "react-icons/md";

export default function ProfilePost() {
  const { id } = useParams();
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfoResponse = await axios.get('/api/auth/user-info');
        const userIdFromResponse = userInfoResponse.data.userId;

        if (!userIdFromResponse) {
          throw new Error('ID del usuario no encontrado en la respuesta del servidor');
        }

        setUserId(userIdFromResponse);
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error.response ? error.response.data : error.message);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchUserPublications = async () => {
      if (!userId) return;  // Asegúrate de no hacer la llamada si el userId no está disponible

      try {
        const response = await axios.get(`/api/publication/user/${id}`);
        setPublications(response.data);

        if (response.data.msg) {
          setMessage(response.data.msg);
        } else {
          setMessage('');
        }

        setLoading(false);
      } catch (error) {
        setMessage('Error al cargar las publicaciones del usuario');
        setLoading(false);
      }
    };

    fetchUserPublications();
  }, [id, userId]); // Este efecto depende de userId, y solo se ejecuta cuando se obtiene correctamente

  const handleLike = async (publicationId, liked) => {

    try {
      if (liked) {
        await axios.post(`/api/publication/${publicationId}/unlike`, { userId });
      } else {
        await axios.post(`/api/publication/${publicationId}/like`, { userId });
      }

      setPublications((prevPublications) =>
        prevPublications.map((publication) =>
          publication._id === publicationId
            ? {
              ...publication,
              likes: liked
                ? publication.likes.filter((id) => id !== userId)
                : [...(Array.isArray(publication.likes) ? publication.likes : []), userId]
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

  const openCommentModal = (publicationId) => {
    setSelectedPublication(publicationId);
    setCommentModalOpen(true);
  };
  const closeCommentModal = () => {
    setCommentModalOpen(false);
    setSelectedPublication(null);
  };
  // const refreshPublications = async () => {
  //   try {
  //     const response = await axios.get('/api/publication/user');
  //     setPublications(response.data);
  //   } catch (error) {
  //     console.error('Error al actualizar las publicaciones:', error);
  //   }
  // };

  return (
    <div div className="rounded-lg mt-8 flex w-full" >
      <div className="space-y-4 w-full md:w-1/2">
        {message && <p className="text-center text-gray-500 pt-10 text-1xl">{message}</p>}
        {!message && publications.length > 0 ? (
          publications.map((publication) => {
            const liked = Array.isArray(publication.likes) && publication.likes.includes(userId);

            return (
              <div key={publication._id} className="rounded-lg my-2">
                <div className="flex items-center space-x-4 mb-2 px-2">
                  <img
                    src={publication.user.profilePicture || 'https://metro.co.uk/wp-content/uploads/2018/09/sei_30244558-285d.jpg?quality=90&strip=all'}
                    alt="Perfil"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="flex items-center text-sm font-semibold">
                      {publication.user.name} {publication.user.apellido}
                      {publication.user.isVerified === true && (
                        <MdVerified
                          className="text-blue-500 ml-2"
                          title="Cuenta verificada"
                        />
                      )}
                    </h2>
                    <p className="text-sm text-gray-500">{new Date(publication.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                <p className="mb-4 px-2">{publication.description}</p>

                <div className="w-full">
                  {publication.video ? (
                    <div className="relative w-full">
                      <video
                        controls
                        className="w-full h-auto object-contain rounded-md p-1 sm:p-2"
                      >
                        <source src={publication.video} type="video/mp4" />
                        Tu navegador no soporta la reproducción de videos.
                      </video>
                    </div>
                  ) : publication.image ? (
                    <img
                      onDoubleClick={() => handleLike(publication._id)}
                      src={publication.image}
                      alt="Imagen de la publicación"
                      className="w-full object-cover rounded-lg p-1 sm:p-2"
                    />
                  ) : null}
                </div>

                <div className="flex items-center justify-between px-5 py-2">
                  <div className="flex space-x-4">
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

                    <button onClick={() => openCommentModal(publication._id)}
                      className="focus:outline-none">
                      <img
                        src="/img/icons/comentario.png"
                        alt="Comment"
                        className="w-7 h-7 object-cover"
                      />
                    </button>
                  </div>
                  <button className="focus:outline-none">
                    <img
                      src="/img/icons/guardar-instagram.png"
                      alt="Save"
                      className="w-6 h-6"
                    />
                  </button>
                </div>

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

      </div>
      <div className='hidden lg:block w-1/2'>
        <SavePublication />
      </div>
      <ModalComment
        isOpen={commentModalOpen}
        onClose={closeCommentModal}
        publicationId={selectedPublication}
      // refreshComments={refreshPublications}
      />
      <ToastContainer />
    </div>
  );
}
