'use client';

import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios';
import { FaRegHeart, FaHeart, FaReply, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function CommentModal({ isOpen, onClose, publicationId, refreshComments }) {
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
            console.log("Comentarios:", response.data);
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-white w-full md:w-[75%] h-[90vh] rounded-lg overflow-hidden flex">
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

                        {/* Comentarios */}
                        {Array.isArray(comments) && comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment._id} className="p-4 border-b">
                                    {/* Comentario principal */}
                                    <div className="flex">
                                        <img
                                            src={comment.user.profilePicture || 'https://metro.co.uk/wp-content/uploads/2018/09/sei_30244558-285d.jpg?quality=90&strip=all'}
                                            alt="Perfil"
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <div className="ml-3 flex-1">
                                            <p className="font-semibold">{comment.user.name}</p>
                                            <p>{comment.text}</p>
                                            <div className="flex items-center mt-2 text-xs text-gray-500">
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
                                                    <FaReply className="mr-1" />
                                                    Responder
                                                </button>
                                                <span className="text-xs">{new Date(comment.createdAt).toLocaleDateString()}</span>

                                                {/* Botón para mostrar respuestas solo si hay respuestas */}
                                                {comment.replies && comment.replies.length > 0 && (
                                                    <button
                                                        className="ml-auto flex items-center text-blue-500"
                                                        onClick={() => toggleReplies(comment._id)}
                                                    >
                                                        {expandedComments[comment._id] ? (
                                                            <>Ocultar respuestas <FaChevronUp className="ml-1" /></>
                                                        ) : (
                                                            <>Ver {comment.replies.length} respuesta{comment.replies.length !== 1 ? 's' : ''} <FaChevronDown className="ml-1" /></>
                                                        )}
                                                    </button>
                                                )}
                                            </div>

                                            {/* Campo para responder */}
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

                                    {/* Respuestas (solo si hay respuestas y están expandidas) */}
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
                                                            <p className="font-semibold text-sm">{reply.user.name}</p>
                                                            <p className="text-sm">{reply.text}</p>
                                                            <div className="flex items-center mt-1 text-xs text-gray-500">
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
                                                                <span className="text-xs">{new Date(reply.createdAt).toLocaleDateString()}</span>
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
                                className={`text-blue-500 font-semibold ${loading || !comment.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
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