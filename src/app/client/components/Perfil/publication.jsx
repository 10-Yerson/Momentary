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
            <div className="mx-auto rounded-lg mt-8">
                {error && <p className="text-red-500">{error}</p>}

                {publications.length === 0 && (
                    <p className="text-gray-500">No has creado ninguna publicación todavía.</p>
                )}

                <div className="space-y-5">
                    {publications.map((publication) => (
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
                                    src={publication.image}
                                    alt="Imagen de la publicación"
                                    className="w-full h-96 object-cover rounded-lg"
                                />
                            )}

                            <div className="flex items-center justify-between px-5 py-2">
                                <div className="flex space-x-4">
                                    <button className="focus:outline-none">
                                        <img src="\img\icons\me-gusta.png" alt="Like" className="w-6 h-6 object-cover" />
                                    </button>
                                    <button className="focus:outline-none">
                                        <img src="\img\icons\comentario.png" alt="Comment" className="w-7 h-7 object-cover" />
                                    </button>
                                </div>
                                <button className="focus:outline-none">
                                    <img src="\img\icons\guardar-instagram.png" alt="Save" className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="px-4 pb-2">
                                <p className="text-sm font-semibold mb-1">{publication.likes.toLocaleString()} Me gusta</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
