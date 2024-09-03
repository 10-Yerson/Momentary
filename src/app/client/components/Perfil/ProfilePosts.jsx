import React, { useState } from 'react';

export default function ProfilePosts() {
    const [newPost, setNewPost] = useState('');

    const handlePost = () => {
        // Aquí puedes manejar el envío de nuevas publicaciones
        console.log('Nueva publicación:', newPost);
        setNewPost('');
    };

    return (
        <div className="mt-6 bg-white shadow-md rounded-lg p-4">
            {/* Crear nueva publicación */}
            <div className="mb-4">
                <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="¿Qué estás pensando?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                />
                <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={handlePost}
                >
                    Publicar
                </button>
            </div>

            {/* Lista de publicaciones */}
            <div>
                {/* Aquí agregarías una lista de publicaciones */}
                <div className="border-t border-gray-300 pt-4">
                    <h3 className="font-semibold">Publicaciones</h3>
                    {/* Renderizar publicaciones */}
                    <div className="mt-2">No hay publicaciones aún.</div>
                </div>
            </div>
        </div>
    );
}
