'use client'

import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios';
import NotFriends from '../../components/Amistades/NotFriends';
import Link from 'next/link';
import { MdVerified } from "react-icons/md";
import ModalComment from '../../userprofile/[id]/components/comentario';


export default function SeguidoresPublication() {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    const [commentModalOpen, setCommentModalOpen] = useState(false);
    const [selectedPublication, setSelectedPublication] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await axios.get('/api/auth/user-info');
                const id = response.data.userId;
                if (!id) {
                    throw new Error('ID del usuario no encontrado en la respuesta del servidor');
                }
                setUserId(id);
            } catch (error) {
                console.error("Error obteniendo el ID del usuario:", error);
                setError("Error obteniendo la información del usuario.");
                setLoading(false);
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await axios.get('/api/publication/following');
                setPublications(response.data);
            } catch (err) {
                setError('Error obteniendo publicaciones');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPublications();
    }, []);

    const handleLike = async (publicationId, liked) => {
        if (!userId) {
            console.error("No se encontró el userId");
            return;
        }

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

    if (loading) return <div className='w-full md:w-1/2 justify- flex items-center px-2'>Cargando publicaciones...</div>;
    if (error) return <p>{error}</p>;

    if (publications.length === 0) {
        return <NotFriends />;
    }

    const openCommentModal = (publicationId) => {
        setSelectedPublication(publicationId);
        setCommentModalOpen(true);
    };

    const closeCommentModal = () => {
        setCommentModalOpen(false);
        setSelectedPublication(null);
    };

    return (
        <div className="w-full md:w-1/2 flex justify-center flex-col">
            {publications.map((publication) => {
                const liked = Array.isArray(publication.likes) && publication.likes.includes(userId); // Verifica si el usuario ya dio "like"

                return (
                    <div key={publication._id} className="bg-white rounded-lg">
                        <Link href={`/client/userprofile/${publication.user._id}`}>
                            <div className="flex items-center py-4 px-2">
                                <img
                                    src={publication.user.profilePicture}
                                    alt={publication.user.name}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div className="ml-3">
                                    <h2 className="flex items-center text-sm font-semibold">
                                        {publication.user.name} {publication.user.apellido}
                                        {publication.user.isVerified === true && (
                                            <MdVerified
                                                className="text-blue-500 ml-2"
                                                title="Cuenta verificada"
                                            />
                                        )}
                                    </h2>

                                    <span className="text-[11px] text-gray-500">
                                        {new Date(publication.createdAt).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </Link>

                        <div className="pb-2 px-2">
                            <p className="mt-2 text-sm">
                                {publication.description}
                            </p>
                        </div>

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


                        {/* Botones de interacción */}
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
                                <button onClick={() => openCommentModal(publication._id)}
                                    className="focus:outline-none">
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
            })}
            <ModalComment
                isOpen={commentModalOpen}
                onClose={closeCommentModal}
                publicationId={selectedPublication}
            // refreshComments={refreshPublications}
            />
        </div>
    );
}
