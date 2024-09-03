'use client'

import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import ProtectedRoute from '../protected/ProtectedRoute';

export default function CreatePublication() {
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const defaultImageUrl = 'https://th.bing.com/th/id/R.a0b6a2b06abd39a417d2b181a76c584c?rik=IKbsVNgF0RX8tQ&pid=ImgRaw&r=0';

    const [publications, setPublications] = useState([]);
    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await axios.get('/api/publication/user');
                setPublications(response.data);
            } catch (err) {
                console.error('Error al obtener publicaciones:', err);
            }
        };

        fetchPublications();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/publication/create', {
                description,
            });

            setSuccess('Publicación creada con éxito');
            setDescription('');  // Limpia el campo de descripción
        } catch (err) {
            setError('Error al crear la publicación');
        }
    };
    return (
        <ProtectedRoute roles={['user', 'admin']}>
            <div className='flex flex-col md:flex-row gap-4'>
                {/* Sección de Crear Publicación */}
                <div className="w-full md:w-[50vw] mx-auto p-4 bg-white shadow-md rounded-lg mt-8">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Crear Publicación</h1>
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}

                    <form onSubmit={handleSubmit}>
                        {/* Campo de descripción */}
                        <div className="mb-4">
                            <textarea
                                className="w-full h-28 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="¿Qué estás pensando?"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {/* Imagen por defecto con ancho completo */}
                        <div className="flex items-center justify-center mb-4">
                            <img
                                src={defaultImageUrl}
                                alt="Imagen por defecto"
                                className="w-full h-auto rounded-md object-cover border border-gray-300"
                            />
                        </div>

                        {/* Botón de Publicar */}
                        <div className="flex justify-start">
                            <button
                                className="bg-neutral-950 text-white border border-neutral-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md"
                                type="submit"
                            >
                                Publicar
                            </button>

                        </div>
                    </form>
                </div>

                {/* Sección de Publicaciones */}
                <div className="w-full md:w-[50vw] mt-8">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Publicaciones</h1>
                    <div className="space-y-6">
                        {publications.map((publication) => (
                            <div key={publication._id} className="bg-white shadow-md rounded-lg p-4">
                                <div className="flex items-start space-x-4">
                                    <img
                                        src={publication.image}
                                        alt="Imagen de la publicación"
                                        className="w-20 h-20 rounded-md object-cover"
                                    />
                                    <div>
                                        <p className="text-gray-700 font-semibold">{publication.description}</p>
                                        <div className="flex space-x-4 text-gray-500 text-sm mt-2">
                                            <p>👍 {publication.likes} Likes</p>
                                            <p>💬 {publication.comments.length} Comentarios</p>
                                            <p>🔄 {publication.shares} Compartidos</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>




        </ProtectedRoute>

    )
}


