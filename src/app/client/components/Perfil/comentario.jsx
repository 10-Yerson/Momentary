'use client';

import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

export default function CommentModal({ isOpen, onClose, publicationId, refreshComments }) {
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [publicationData, setPublicationData] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (isOpen && publicationId) {
            fetchPublicationData();
        }
    }, [isOpen, publicationId]);

    const fetchPublicationData = async () => {
        try {
            const response = await axios.get(`/api/publication/${publicationId}`);
            setPublicationData(response.data);
            // Obtener comentarios
            if (response.data.comments) {
                setComments(response.data.comments);
            } else {
                setComments([]);
            }
        } catch (error) {
            console.error('Error al obtener los datos de la publicación:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setLoading(true);
        try {
            await axios.post(`/api/publication/${publicationId}/comment`, {
                content: comment
            });
            setComment('');
            await fetchPublicationData(); // Actualizar los comentarios
            if (refreshComments) {
                refreshComments();
            }
        } catch (error) {
            console.error('Error al publicar el comentario:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLikeComment = async (commentId) => {
        try {
            await axios.post(`/api/comment/${commentId}/like`);
            await fetchPublicationData(); // Refrescar los comentarios
        } catch (error) {
            console.error('Error al dar like al comentario:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-4xl h-[90vh] rounded-lg overflow-hidden flex">
                {/* Sección de la imagen (lado izquierdo) */}
                {publicationData && publicationData.image && (
                    <div className="w-1/2 bg-black flex items-center justify-center">
                        <img
                            src={publicationData.image}
                            alt="Publicación"
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>
                )}

                {/* Sección de comentarios (lado derecho) */}
                <div className={`${publicationData && publicationData.image ? 'w-1/2' : 'w-full'} flex flex-col h-full`}>
                    {/* Cabecera con el perfil */}
                    <div className="flex items-center p-4 border-b">
                        <button onClick={onClose} className="ml-auto text-gray-500 hover:text-gray-700">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    {publicationData && (
                        <>
                            {/* Información del autor */}
                            <div className="flex items-center p-4 border-b">
                                <img
                                    src={publicationData.user?.profilePicture || 'https://metro.co.uk/wp-content/uploads/2018/09/sei_30244558-285d.jpg?quality=90&strip=all'}
                                    alt="Perfil"
                                    className="w-8 h-8 rounded-full object-cover mr-3"
                                />
                                <div>
                                    <span className="font-semibold">{publicationData.user?.name || 'Usuario'}</span>
                                    <span className="text-blue-500 ml-2">•</span>
                                </div>
                                <div className="ml-auto">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                                    </svg>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Lista de comentarios */}
                    <div className="flex-1 overflow-y-auto py-2">
                        {publicationData && (
                            <div className="flex p-4">
                                <img
                                    src={publicationData.user?.profilePicture || 'https://metro.co.uk/wp-content/uploads/2018/09/sei_30244558-285d.jpg?quality=90&strip=all'}
                                    alt="Perfil"
                                    className="w-8 h-8 rounded-full object-cover mr-3 self-start"
                                />
                                <div>
                                    <p>
                                        <span className="font-semibold">{publicationData.user?.name || 'Usuario'}</span> {publicationData.description}
                                    </p>
                                    <p className="text-gray-500 text-xs mt-1">
                                        {new Date(publicationData.createdAt).toLocaleDateString()}
                                        <span className="ml-2 cursor-pointer">Ver traducción</span>
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Comentarios */}
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment._id} className="flex p-4">
                                    <img
                                        src={comment.user?.profilePicture || 'https://metro.co.uk/wp-content/uploads/2018/09/sei_30244558-285d.jpg?quality=90&strip=all'}
                                        alt="Perfil"
                                        className="w-8 h-8 rounded-full object-cover mr-3 self-start"
                                    />
                                    <div className="flex-1">
                                        <p>
                                            <span className="font-semibold">{comment.user?.name || 'Usuario'}</span> {comment.content}
                                        </p>
                                        <div className="flex items-center mt-1 text-xs text-gray-500">
                                            <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                                            <span className="mx-2">{comment.likes?.length || 0} Me gusta</span>
                                            <span className="cursor-pointer">Responder</span>
                                        </div>

                                        {/* Respuestas a este comentario (si las hay) */}
                                        {comment.replies && comment.replies.length > 0 && (
                                            <div className="ml-8 mt-2">
                                                <p className="text-gray-500 text-xs mb-2 cursor-pointer">
                                                    Ver respuestas ({comment.replies.length})
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleLikeComment(comment._id)}
                                        className="text-gray-500 hover:text-gray-700 ml-2"
                                    >
                                        {comment.isLiked ? (
                                            <FaHeart className="text-red-500" />
                                        ) : (
                                            <FaRegHeart />
                                        )}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-20">
                                <p className="text-gray-500 text-sm">No hay comentarios aún</p>
                            </div>
                        )}
                    </div>

                    {/* Sección inferior: Likes y fecha */}
                    {publicationData && (
                        <div className="border-t px-4 py-2">
                            <div className="flex space-x-4 my-2">
                                <button>
                                    <img
                                        src="/img/icons/me-gusta.png"
                                        alt="Like"
                                        className="w-6 h-6 object-cover"
                                    />
                                </button>
                                <button>
                                    <img
                                        src="/img/icons/comentario.png"
                                        alt="Comment"
                                        className="w-6 h-6 object-cover"
                                    />
                                </button>
                                <button className="ml-auto">
                                    <img
                                        src="/img/icons/guardar-instagram.png"
                                        alt="Save"
                                        className="w-6 h-6 object-cover"
                                    />
                                </button>
                            </div>
                            <p className="font-semibold">
                                {publicationData.likes?.length.toLocaleString() || 0} Me gusta
                            </p>
                            <p className="text-gray-500 text-xs">
                                {new Date(publicationData.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    )}

                    {/* Input para comentar */}
                    <div className="border-t p-4">
                        <form onSubmit={handleSubmit} className="flex">
                            <span className="mr-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </span>
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Agrega un comentario..."
                                className="flex-1 outline-none"
                            />
                            <button
                                type="submit"
                                disabled={loading || !comment.trim()}
                                className={`text-blue-500 font-semibold ${loading || !comment.trim() ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                Publicar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}