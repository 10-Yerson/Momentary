'use client';

import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios';

export default function PublicationGetting() { // Cambié el nombre del componente a "Page" con la primera letra mayúscula
    const [publications, setPublications] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserPublications = async () => {
            try {
                const response = await axios.get('/api/publication/user'); // Cambié la ruta a '/user'
                setPublications(response.data);
            } catch (err) {
                setError('Error al obtener publicaciones del usuario');
            }
        };

        fetchUserPublications();
    }, []); // Agregar dependencia vacía para que el hook se ejecute solo una vez al cargar el componente

    return (
        <>
            <div className="mx-auto p-4 bg-white shadow-md rounded-lg mt-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Mis Publicaciones</h1>
                {error && <p className="text-red-500">{error}</p>}

                {publications.length === 0 && (
                    <p className="text-gray-500">No has creado ninguna publicación todavía.</p>
                )}

                <div className="space-y-4">
                    {publications.map((publication) => (
                        <div key={publication._id} className="p-4 border border-gray-300 rounded-lg shadow-sm">
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
                                    src={publication.image}
                                    alt="Imagen de la publicación"
                                    className="w-full h-96 object-cover rounded-lg"
                                />
                            )}

                            <div className="flex justify-between items-center mt-4">
                                <p className="text-sm text-gray-500">👍 {publication.likes} Likes</p>
                                <p className="text-sm text-gray-500">💬 {publication.comments.length} Comentarios</p>
                                <p className="text-sm text-gray-500">🔄 {publication.shares} Compartidos</p>
                                {/* <p className="text-sm text-gray-500">👍 Likes: {publication.likes}</p>
                                <p className="text-sm text-gray-500">💬 Comentarios: {publication.comments.length}</p>
                                <p className="text-sm text-gray-500">🔄 Compartidos: {publication.shares}</p> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
