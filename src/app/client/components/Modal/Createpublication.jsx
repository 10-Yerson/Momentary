'use client'
import Link from 'next/link';
import axios from '../../../../utils/axios'
import React, { useEffect, useState } from "react";

export default function Createpublication({ isOpen, onClose }) {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    if (!isOpen) return null;

    // Función para manejar la selección de la imagen
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file); // Almacenar la imagen seleccionada en el estado
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Crear una URL temporal para mostrar la imagen
            setSelectedImage(imageUrl); // Mostrar la imagen seleccionada
        }
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!description || !image) {
            setError('Ambos campos, la descripción y la imagen, son obligatorios.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('description', description);
            formData.append('image', image);

            const response = await axios.post('/api/publication/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccessMessage('¡Publicación creada exitosamente!');
            setDescription('');
            setImage(null);
            setSelectedImage(null);
            setError('');
            onClose();
        } catch (error) {
            console.error('Error creando la publicación:', error);
            setError('No se pudo crear la publicación. Intenta de nuevo.');
        }
    };

    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <form className="bg-white w-[85%]  md:w-[60%] rounded-lg lg:w-[50%] shadow-lg p-6" onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Crear publicación</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <i className="fas fa-times text-xl">X</i>
                        </button>
                    </div>
                    <div className="flex items-center mb-4">
                        <img src="https://placehold.co/50x50" alt="User profile picture" className="rounded-full w-12 h-12 mr-3" />
                        <div>
                            <p className="font-semibold">Yerson DG</p>
                            <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                                <i className="fas fa-users mr-1"></i> Amigos <i className="fas fa-caret-down ml-1"></i>
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                            className="w-full border-none focus:ring-0 text-lg text-gray-700" rows="3" placeholder="¿Qué estás pensando?"></textarea>
                    </div>
                    {selectedImage && (
                        <div className="my-4">
                            <img src={selectedImage} alt="Selected" className="w-full h-48 object-cover rounded-lg" />
                        </div>
                    )}
                    <div className="pt-2 border rounded-lg">
                        <label className="flex items-center w-full py-3 px-4 text-gray-500 hover:text-gray-700 cursor-pointer">
                            <span className="text-sm">Añadir a tu publicación</span>
                            <img className="w-7 object-cover ml-4" src="\img\icons\galeria.png" alt="img" />
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange} 
                            />
                        </label>
                    </div>
                    <div className="mt-4">
                        <button  type="submit" 
                            className="w-full py-3 bg-gray-300 text-gray-600 rounded-lg cursor-pointer">Publicar</button>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
                </form>
            </div>
        </div>
    );
}
