'use client'
import axios from '../../../../utils/axios';
import React, { useState } from "react";

export default function CreatePublication({ isOpen, onClose }) {
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    // Manejar selección de imagen o video
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (!selectedFile) return;

        const fileType = selectedFile.type;
        setFile(selectedFile);

        if (fileType.startsWith("image/")) {
            setPreview(URL.createObjectURL(selectedFile));
        } else if (fileType.startsWith("video/")) {
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setError("Formato no soportado. Solo se permiten imágenes y videos.");
            setFile(null);
            setPreview(null);
        }
    };

    // Enviar la publicación
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!description || !file) {
            setError('Ambos campos, la descripción y un archivo (imagen o video), son obligatorios.');
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('description', description);
            formData.append('file', file);

            await axios.post('/api/publication/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setSuccessMessage('¡Publicación creada exitosamente!');
            setDescription('');
            setFile(null);
            setPreview(null);
            setError('');
            onClose();
        } catch (error) {
            console.error('Error creando la publicación:', error);
            setError('No se pudo crear la publicación. Intenta de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <form className="bg-white w-[85%] md:w-[60%] lg:w-[50%] rounded-lg shadow-lg p-6" onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Crear publicación</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">X</button>
                    </div>

                    <div className="mb-4">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border-none focus:ring-0 text-lg text-gray-700"
                            rows="3"
                            placeholder="¿Qué estás pensando?"
                        ></textarea>
                    </div>

                    {/* Previsualización de imagen o video */}
                    {preview && (
                        <div className="my-4">
                            {file?.type.startsWith("image/") ? (
                                <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                            ) : (
                                <video controls className="w-full h-48 rounded-lg">
                                    <source src={preview} type={file?.type} />
                                    Tu navegador no soporta la reproducción de este video.
                                </video>
                            )}
                        </div>
                    )}

                    {/* Botón para seleccionar archivo */}
                    <div className="pt-2 border rounded-lg">
                        <label className="flex items-center w-full py-3 px-4 text-gray-500 hover:text-gray-700 cursor-pointer">
                            <span className="text-sm">Añadir a tu publicación</span>
                            <img className="w-7 object-cover ml-4" src="/img/icons/galeria.png" alt="img" />
                            <input
                                type="file"
                                accept="image/*,video/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-full py-3 bg-gray-300 text-gray-600 rounded-lg cursor-pointer"
                        >
                            {isLoading ? 'Creando publicación...' : 'Publicar'}
                        </button>
                    </div>

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
                </form>
            </div>
        </div>
    );
}
