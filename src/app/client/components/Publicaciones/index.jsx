'use client'

import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios'; // Ajusta la ruta según tu estructura 

export default function SeguidoresPublication() {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null); // Estado para almacenar el userId

    // Obtener el userId de localStorage al montar el componente
    useEffect(() => {
        const id = localStorage.getItem('userId');
        setUserId(id);
    }, []);

    // Obtener publicaciones de la API
    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await axios.get('api/publication/following');
                setPublications(response.data);
                console.log('Data Publication', response.data);
            } catch (err) {
                setError('Error fetching publications');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPublications();
    }, []);

    // Manejar el "like" y "unlike" de una publicación
    const handleLike = async (publicationId, liked) => {
        if (!userId) {
            console.error("No se encontró el userId en localStorage");
            return;
        }

        try {
            if (liked) {
                // Si ya ha dado like, eliminar el like
                await axios.post(`/publication/${publicationId}/unlike`, { userId });
            } else {
                // Si no ha dado like, agregar el like
                await axios.post(`/publication/${publicationId}/like`, { userId });
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

    if (loading) return <p>Cargando publicaciones...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="w-full md:w-1/2 flex justify-center flex-col">
            {publications.map((publication) => {
                const liked = Array.isArray(publication.likes) && publication.likes.includes(userId); // Verifica si el usuario ya dio "like"

                return (
                    <div key={publication._id} className="bg-white rounded-lg mb-6 p-3">
                        {/* Información del usuario que publicó */}
                        <div className="flex items-center py-4">
                            <img
                                src={publication.user.profilePicture}
                                alt={publication.user.name}
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="ml-3">
                                <h2 className="font-semibold text-sm">{publication.user.name}</h2>
                                <span className="text-xs text-gray-500">
                                    {new Date(publication.createdAt).toLocaleString()}
                                </span>
                            </div>
                        </div>

                        {/* Descripción de la publicación */}
                        <div className="pb-2">
                            <p className="mt-2 text-sm">
                                <span className="font-semibold mr-2">{publication.user.name}</span>
                                {publication.description}
                            </p>
                        </div>

                        {/* Imagen de la publicación */}
                        <div className="w-full">
                            <img onDoubleClick={() => handleLike(publication._id, liked)} // Manejar doble clic para dar "like"
                            src={publication.image} alt="Publication" className="w-full object-cover rounded-lg" />
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
            })}
        </div>
    );
}
