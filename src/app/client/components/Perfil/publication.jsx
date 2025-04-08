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
    const [menuOpenId, setMenuOpenId] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editDescription, setEditDescription] = useState('');

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
                const response = await axios.get('/api/publication/user');
                setPublications(response.data);

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
    }, [userId]); // Este efecto se ejecuta cada vez que el userId cambia

    const handleLike = async (publicationId) => {

        const liked = likesState[publicationId];
        try {
            if (liked) {
                await axios.post(`/api/publication/${publicationId}/unlike`, { userId });
            } else {
                await axios.post(`/api/publication/${publicationId}/like`, { userId });
            }

            setLikesState((prevLikesState) => ({
                ...prevLikesState,
                [publicationId]: !liked,
            }));
            setPublications((prevPublications) =>
                prevPublications.map((publication) =>
                    publication._id === publicationId
                        ? {
                            ...publication,
                            likes: liked
                                ? publication.likes.filter((id) => id !== userId)
                                : [...publication.likes, userId]
                        }
                        : publication
                )
            );
        } catch (error) {
            console.error('Error al manejar el like:', error.response ? error.response.data : error.message);
        }
    };

    const openCommentModal = (publicationId) => {
        setSelectedPublication(publicationId);
        setCommentModalOpen(true);
    };

    const closeCommentModal = () => {
        setCommentModalOpen(false);
        setSelectedPublication(null);
    };

    const refreshPublications = async () => {
        try {
            const response = await axios.get('/api/publication/user');
            setPublications(response.data);
        } catch (error) {
            console.error('Error al actualizar las publicaciones:', error);
        }
    };


    const toggleMenu = (id) => {
        setMenuOpenId(menuOpenId === id ? null : id);
    };

    const handleEdit = (id, currentDescription) => {
        setEditingId(id);
        setEditDescription(currentDescription); 
        setMenuOpenId(null); 
    };
    
    const saveEdit = async (id) => {
        try {
            const response = await axios.put(`/api/publication/update/${id}`,
                { description: editDescription },
                { withCredentials: true }
            );
            setPublications(prev =>
                prev.map(pub => pub._id === id ? { ...pub, ...response.data.publication } : pub)
            );

            setEditingId(null);
        } catch (error) {
            console.error('Error al actualizar publicación:', error.response?.data?.message || error.message);
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/publication/delete/${id}`, {
                withCredentials: true,
            });
            setPublications(prev => prev.filter(pub => pub._id !== id));
            setMenuOpenId(null);
        } catch (error) {
            console.error('Error al eliminar publicación:', error.response?.data?.message || error.message);
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
                            <div key={publication._id} className="rounded-lg">
                                <div className="flex items-center justify-between mb-2 px-2">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={publication.user.profilePicture || 'https://metro.co.uk/wp-content/uploads/2018/09/sei_30244558-285d.jpg?quality=90&strip=all'}
                                            alt="Perfil"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold">
                                                {publication.user.name} {publication.user.apellido}
                                            </h3>
                                            <p className="text-sm text-gray-500">{new Date(publication.createdAt).toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <button onClick={() => toggleMenu(publication._id)} className="text-gray-600 hover:text-black text-xl">
                                            ⋮
                                        </button>

                                        {menuOpenId === publication._id && (
                                            <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-50">
                                                <button
                                                   onClick={() => handleEdit(publication._id, publication.description)}
                                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(publication._id)}
                                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {editingId === publication._id ? (
                                    <div className="mb-4 px-2">
                                        <textarea
                                            className="w-full border border-gray-300 rounded p-2 mb-2"
                                            value={editDescription}
                                            onChange={(e) => setEditDescription(e.target.value)}
                                            rows={2}

                                        />
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={cancelEdit}
                                                className="px-3 py-1 bg-gray-200 rounded text-sm"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                onClick={() => saveEdit(publication._id)}
                                                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                                            >
                                                Guardar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="mb-4 px-2">{publication.description}</p>
                                )}

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