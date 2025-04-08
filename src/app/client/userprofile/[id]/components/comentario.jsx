'use client';

import { useState, useEffect } from 'react';
import axios from '../../../../../utils/axios';
import { FaRegHeart, FaHeart, FaReply, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdVerified } from "react-icons/md";

export default function ModalComment({ isOpen, onClose, publicationId, refreshComments }) {
    const [comment, setComment] = useState('');
    const [replyText, setReplyText] = useState('');
    const [loading, setLoading] = useState(false);
    const [publicationData, setPublicationData] = useState(null);
    const [comments, setComments] = useState([]);
    const [replyingTo, setReplyingTo] = useState(null);
    const [expandedComments, setExpandedComments] = useState({});

    useEffect(() => {
        if (isOpen && publicationId) {
            fetchPublicationData();
            fetchComments();
        }
    }, [isOpen, publicationId]);

    const fetchPublicationData = async () => {
        try {
            const response = await axios.get(`/api/publication/public/${publicationId}`);
            setPublicationData(response.data);
        } catch (error) {
            console.error('Error al obtener los datos de la publicación:', error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/api/comentario/publication/${publicationId}`);
            setComments(response.data);
        } catch (error) {
            console.error('Error al obtener los comentarios:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setLoading(true);
        try {
            await axios.post('/api/comentario', {
                publicationId: publicationId,
                text: comment
            });

            setComment('');
            await fetchComments();

            if (refreshComments) {
                refreshComments();
            }
        } catch (error) {
            console.error('Error al publicar el comentario:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        if (!replyText.trim() || !replyingTo) return;

        setLoading(true);
        try {
            await axios.post('/api/comentario', {
                publicationId: publicationId,
                text: replyText,
                parentCommentId: replyingTo
            });

            setReplyText('');
            setReplyingTo(null);
            await fetchComments();

            if (refreshComments) {
                refreshComments();
            }
        } catch (error) {
            console.error('Error al publicar la respuesta:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLikeComment = async (commentId) => {
        try {
            await axios.post(`/api/comentario/like/${commentId}`);
            await fetchComments();
        } catch (error) {
            console.error('Error al dar like al comentario:', error);
        }
    };

    const handleUnlikeComment = async (commentId) => {
        try {
            await axios.delete(`/api/comentario/like/${commentId}`);
            await fetchComments();
        } catch (error) {
            console.error('Error al quitar like del comentario:', error);
        }
    };

    const toggleReply = (commentId) => {
        if (replyingTo === commentId) {
            setReplyingTo(null);
        } else {
            setReplyingTo(commentId);
            setReplyText('');
        }
    };

    const toggleReplies = (commentId) => {
        setExpandedComments(prev => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    };

    const timeAgo = (date) => {
        const now = new Date();
        const seconds = Math.floor((now - new Date(date)) / 1000);

        let interval = Math.floor(seconds / 31536000);
        if (interval >= 1) return `hace ${interval} año${interval > 1 ? 's' : ''}`;

        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) return `hace ${interval} mes${interval > 1 ? 'es' : ''}`;

        interval = Math.floor(seconds / 86400);
        if (interval >= 1) return `hace ${interval} día${interval > 1 ? 's' : ''}`;

        interval = Math.floor(seconds / 3600);
        if (interval >= 1) return `hace ${interval} hora${interval > 1 ? 's' : ''}`;

        interval = Math.floor(seconds / 60);
        if (interval >= 1) return `hace ${interval} minuto${interval > 1 ? 's' : ''}`;

        return 'hace unos segundos';
    };

    // Función para renderizar el contenido multimedia (imagen o video)
    const renderMedia = () => {
        if (!publicationData) return null;

        if (publicationData.video) {
            return (
                <video
                    src={publicationData.video}
                    controls
                    className="h-full w-full object-contain rounded-md"
                    autoPlay
                    loop
                />
            );
        } else if (publicationData.image) {
            return (
                <img
                    src={publicationData.image}
                    alt="Publicación"
                    className="h-full w-full object-contain rounded-md"
                />
            );
        }

        return null;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-white w-full md:w-[75%] h-[90vh] rounded-lg overflow-hidden flex">

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-white z-10 hidden lg:block"
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                {publicationData && (publicationData.image || publicationData.video) && (
                    <div className="hidden md:flex md:w-1/2 bg-black items-center justify-center">
                        {renderMedia()}
                    </div>
                )}

                <div className={`${publicationData && (publicationData.image || publicationData.video) ? 'md:w-1/2 w-full' : 'w-full'} flex flex-col h-full`}>


                    {publicationData && (
                        <>
                            {/* Información del autor */}
                            <div className="flex items-center p-4 border-b">
                                <img
                                    src={publicationData.user?.profilePicture || 'https://metro.co.uk/wp-content/uploads/2018/09/sei_30244558-285d.jpg?quality=90&strip=all'}
                                    alt="Perfil"
                                    className="w-8 h-8 rounded-full object-cover mr-3"
                                />
                                <div className="flex items-center gap-x-2">
                                    <span className="font-semibold flex items-center gap-x-1">
                                        {publicationData.user?.name} {publicationData.user?.apellido}
                                        {publicationData.user?.isVerified === true && (
                                            <MdVerified
                                                className="text-blue-500"
                                                title="Cuenta verificada"
                                            />
                                        )}
                                    </span>
                                    <span className="text-blue-500 text-sm">autor</span>
                                </div>

                                <div className="ml-auto flex items-center">
                                    <svg
                                        className="w-6 h-6 hidden lg:block"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                        ></path>
                                    </svg>

                                    <svg
                                        onClick={onClose}
                                        className="w-6 h-6 block lg:hidden"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M6 18L18 6M6 6l12 12"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Lista de comentarios */}
                    <div className="flex-1 overflow-y-auto py-2">

                        {Array.isArray(comments) && comments.length > 0 ? (
                            comments.map((comment) => (

                                <div key={comment._id} className="p-4 border-b">
                                    <div className="flex">
                                        <img
                                            src={comment.user.profilePicture || 'https://metro.co.uk/wp-content/uploads/2018/09/sei_30244558-285d.jpg?quality=90&strip=all'}
                                            alt="Perfil"
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <div className="ml-3 flex-1">
                                            <div className="flex items-center gap-x-2">
                                                <span className="font-semibold flex items-center gap-x-1">
                                                    {comment.user.name} {comment.user.apellido}
                                                    {comment.user.isVerified === true && (
                                                        <MdVerified
                                                            className="text-blue-500"
                                                            title="Cuenta verificada"
                                                        />
                                                    )}
                                                </span>
                                            </div>
                                            <p>{comment.text}</p>
                                            <div className="flex items-center mt-2 text-xs text-gray-500">
                                                <span className="mr-3">{timeAgo(comment.createdAt)}</span>
                                                <button
                                                    onClick={() => comment.likedByUser ? handleUnlikeComment(comment._id) : handleLikeComment(comment._id)}
                                                    className="mr-3 flex items-center"
                                                >
                                                    {comment.likedByUser ? (
                                                        <FaHeart className="text-red-500 mr-1" />
                                                    ) : (
                                                        <FaRegHeart className="mr-1" />
                                                    )}
                                                    {comment.likes?.length || 0}
                                                </button>

                                                <button
                                                    className="mr-3 flex items-center"
                                                    onClick={() => toggleReply(comment._id)}
                                                >
                                                    Responder
                                                </button>

                                                {comment.replies && comment.replies.length > 0 && (
                                                    <button
                                                        className="ml-auto flex items-center"
                                                        onClick={() => toggleReplies(comment._id)}
                                                    >
                                                        {expandedComments[comment._id] ? (
                                                            <>Ocultar respuestas</>
                                                        ) : (
                                                            <>
                                                                Ver respuesta{comment.replies.length !== 1 ? 's' : ''} ({comment.replies.length})
                                                            </>
                                                        )}
                                                    </button>
                                                )}

                                            </div>



                                            {replyingTo === comment._id && (
                                                <form onSubmit={handleReplySubmit} className="mt-3 flex">
                                                    <input
                                                        type="text"
                                                        value={replyText}
                                                        onChange={(e) => setReplyText(e.target.value)}
                                                        placeholder="Escribe una respuesta..."
                                                        className="flex-1 border rounded-md p-2 text-sm"
                                                    />
                                                    <button
                                                        type="submit"
                                                        disabled={!replyText.trim() || loading}
                                                        className={`ml-2 bg-blue-500 text-white px-3 py-2 rounded-md text-sm ${!replyText.trim() || loading ? 'opacity-50' : ''}`}
                                                    >
                                                        Enviar
                                                    </button>
                                                </form>
                                            )}
                                        </div>
                                    </div>

                                    {comment.replies && comment.replies.length > 0 && expandedComments[comment._id] && (
                                        <div className="ml-8 mt-2">
                                            {comment.replies.map(reply => (
                                                <div key={reply._id} className="border-l-2 border-gray-200 pl-4 py-2 mt-2">
                                                    <div className="flex">
                                                        <img
                                                            src={reply.user.profilePicture || 'https://metro.co.uk/wp-content/uploads/2018/09/sei_30244558-285d.jpg?quality=90&strip=all'}
                                                            alt="Perfil"
                                                            className="w-6 h-6 rounded-full"
                                                        />
                                                        <div className="ml-2 flex-1">
                                                            <div className="flex items-center gap-x-2">
                                                                <span className="font-semibold flex items-center gap-x-1">
                                                                    {reply.user.name} {reply.user.apellido}
                                                                    {reply.user.isVerified === true && (
                                                                        <MdVerified
                                                                            className="text-blue-500"
                                                                            title="Cuenta verificada"
                                                                        />
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <p className="text-sm">{reply.text}</p>
                                                            <div className="flex items-center mt-1 text-xs text-gray-500 space-x-3">
                                                                <span className="text-xs">{timeAgo(reply.createdAt)}</span>
                                                                <button
                                                                    onClick={() => reply.likedByUser ? handleUnlikeComment(reply._id) : handleLikeComment(reply._id)}
                                                                    className="mr-3 flex items-center"
                                                                >
                                                                    {reply.likedByUser ? (
                                                                        <FaHeart className="text-red-500 mr-1" />
                                                                    ) : (
                                                                        <FaRegHeart className="mr-1" />
                                                                    )}
                                                                    {reply.likes?.length || 0}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-20">
                                <p className="text-gray-500 text-sm">No hay comentarios aún</p>
                            </div>
                        )}
                    </div>

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
                                        className="w-6 h-6 object-cover"
                                        alt="Comment"
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
                            <p className="text-gray-500 text-xs pt-1">
                                {timeAgo(publicationData.createdAt)}
                            </p>
                        </div>
                    )}
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
                                className={`text-blue-500 font-semibold ${loading || !comment.trim() ? 'opacity-70 cursor-not-allowed' : ''}`}
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