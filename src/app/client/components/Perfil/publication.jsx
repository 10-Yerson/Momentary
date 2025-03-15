'use client';

import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios';
import SavePublication from './guardado.jsx';
import { FaCamera } from "react-icons/fa";
import Createpublication from '../Modal/Createpublication';
import CommentModal from './comentario';

export default function PublicationGetting() {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(null);
    const [likesState, setLikesState] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);
    const [commentModalOpen, setCommentModalOpen] = useState(false);
    const [selectedPublication, setSelectedPublication] = useState(null);

    // Obtener el userId de localStorage al montar el componente
    useEffect(() => {
        const id = localStorage.getItem('userId');
        setUserId(id);
    }, []);

    useEffect(() => {
        const fetchUserPublications = async () => {
            try {
                const response = await axios.get('/api/publication/user');
                setPublications(response.data);

                // Inicializa el estado de "likes" para cada publicación
                const initialLikesState = {};
                response.data.forEach((publication) => {
                    initialLikesState[publication._id] = publication.likes.includes(userId);
                });
                setLikesState(initialLikesState);
            } catch (err) {
                setError('Error al obtener publicaciones del usuario');
            } finally {
                setLoading(false);
            }
        };

        fetchUserPublications();
    }, [userId]); // Agregar dependencia del userIdo

    // Manejar el "like" y "unlike" de una publicación
    const handleLike = async (publicationId) => {
        if (!userId) {
            console.error("No se encontró el userId en localStorage");
            return;
        }

        const liked = likesState[publicationId]; // Verifica si el usuario ya ha dado "like"

        try {
            if (liked) {
                // Si ya ha dado like, eliminar el like
                await axios.post(`/api/publication/${publicationId}/unlike`, { userId });
            } else {
                // Si no ha dado like, agregar el like
                await axios.post(`/api/publication/${publicationId}/like`, { userId });
            }

            // Actualizar el estado local después de dar o quitar like
            setLikesState((prevLikesState) => ({
                ...prevLikesState,
                [publicationId]: !liked, // Alterna el estado del "like"
            }));
            setPublications((prevPublications) =>
                prevPublications.map((publication) =>
                    publication._id === publicationId
                        ? {
                            ...publication,
                            likes: liked
                                ? publication.likes.filter((id) => id !== userId) // Eliminar like
                                : [...publication.likes, userId] // Agregar like
                        }
                        : publication
                )
            );
        } catch (error) {
            console.error('Error al manejar el like:', error.response ? error.response.data : error.message);
        }
    };

    // Abrir el modal de comentarios
    const openCommentModal = (publicationId) => {
        setSelectedPublication(publicationId);
        setCommentModalOpen(true);
    };

    // Cerrar el modal de comentarios
    const closeCommentModal = () => {
        setCommentModalOpen(false);
        setSelectedPublication(null);
    };

    // Refrescar las publicaciones después de agregar un comentario
    const refreshPublications = async () => {
        try {
            const response = await axios.get('/api/publication/user');
            setPublications(response.data);
        } catch (error) {
            console.error('Error al actualizar las publicaciones:', error);
        }
    };

    return (
        <>
            <div className="rounded-lg mt-8 flex w-full">
                <div className="space-y-7 w-full md:w-1/2">
                    {loading ? (
                        <p className="text-center text-gray-500">Cargando publicaciones...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : publications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-10">
                            <FaCamera className="text-5xl mb-3" />
                            <h3 className="text-xl font-semibold">Comparte fotos</h3>
                            <p className="text-sm mb-3">
                                Cuando compartas fotos, aparecerán en tu perfil.
                            </p>
                            <button onClick={() => setModalOpen(true)} className="text-blue-500 font-semibold hover:underline">
                                Comparte tu primera foto
                            </button>
                        </div>
                    ) : (
                        publications.map((publication) => (
                            <div key={publication._id} className="rounded-lg shadow-sm">
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
                                        onDoubleClick={() => handleLike(publication._id)}
                                        src={publication.image}
                                        alt="Imagen de la publicación"
                                        className="w-full object-cover rounded-lg"
                                    />
                                )}

                                <div className="flex items-center justify-between px-5 py-2">
                                    <div className="flex space-x-4">
                                        <button
                                            className="focus:outline-none"
                                            onClick={() => handleLike(publication._id)}
                                            disabled={loading}
                                        >
                                            <img
                                                src={likesState[publication._id] ? "/img/icons/corazon.png" : "/img/icons/me-gusta.png"}
                                                alt="Like"
                                                className="w-6 h-6 object-cover"
                                            />
                                        </button>
                                        <button
                                            className="focus:outline-none"
                                            onClick={() => openCommentModal(publication._id)}
                                        >
                                            <img src="/img/icons/comentario.png" alt="Comment" className="w-7 h-7 object-cover" />
                                        </button>
                                    </div>
                                    <button className="focus:outline-none">
                                        <img src="/img/icons/guardar-instagram.png" alt="Save" className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="px-4 pb-2">
                                    {Array.isArray(publication.likes) ? publication.likes.length.toLocaleString() : '0'} Me gusta
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <Createpublication isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
                <CommentModal
                    isOpen={commentModalOpen}
                    onClose={closeCommentModal}
                    publicationId={selectedPublication}
                    refreshComments={refreshPublications}
                />
                <div className='hidden lg:block w-1/2'>
                    <SavePublication />
                </div>
            </div>
        </>
    );

}