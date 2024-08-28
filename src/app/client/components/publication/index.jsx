// components/PublicationForm.js
'use client'

import React, { useState } from 'react';
import axios from '../../../../utils/axios';


const PublicationForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (file) {
            formData.append('image', file);
        }

        const token = localStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');

        try {
            const response = await axios.post('/api/publication', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': token // Usa el token almacenado en localStorage
                }
            });
            setSuccess('Publicación creada con éxito!');
            setError('');
            setName('');
            setDescription('');
            setFile(null);
        } catch (error) {
            setError('Error al crear la publicación');
            setSuccess('');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200 mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Crear Publicación</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows="4"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
                <input
                    type="file"
                    id="image"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                Crear Publicación
            </button>
        </form>
        {error && <p className="mt-4 text-red-600">{error}</p>}
        {success && <p className="mt-4 text-green-600">{success}</p>}
    </div>
    );
};

export default PublicationForm;
