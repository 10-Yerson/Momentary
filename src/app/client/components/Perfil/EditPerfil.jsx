'use client'
import { useEffect, useState } from 'react';
import axios from '../../../../utils/axios';

export default function EditPerfil() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        apellido: '',
        email: '',
        password: '',
        descripcion: '',
        ciudad: '',
        hobbies: '',
        socialLinks: {
            tiktok: '',
            facebook: '',
            instagram: ''
        }
    });

    const hobbyOptions = [
        'Deportes', 'Lectura', 'Cine', 'Viajar', 'Música', 'Videojuegos', 
        'Fotografía', 'Cocina', 'Escritura', 'Pintura', 'Jardinería', 'Baile'
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    throw new Error('ID del usuario no encontrado en localStorage');
                }
                const response = await axios.get(`/api/user/${userId}`);
                const userData = response.data;

                setUser(userData);
                setFormData({
                    ...formData,
                    name: userData.name || '',
                    apellido: userData.apellido || '',
                    email: userData.email || '',
                    password: '',
                    descripcion: userData.profile.descripcion || '',
                    ciudad: userData.profile.ciudad || '',
                    hobbies: userData.profile.hobbies?.join(', ') || '',
                    socialLinks: {
                        tiktok: userData.socialLinks?.tiktok || '',
                        facebook: userData.socialLinks?.facebook || '',
                        instagram: userData.socialLinks?.instagram || ''
                    }
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('socialLinks.')) {
            const socialKey = name.split('.')[1];
            setFormData({
                ...formData,
                socialLinks: {
                    ...formData.socialLinks,
                    [socialKey]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userId');
            await axios.put(`/api/user/${userId}`, formData);
            setUser(formData);
        } catch (error) {
            console.log('Error updating profile:', error);
        }
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Editar Perfil</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Columna de Información Principal */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Información Principal</h2>
                    <div className="mb-4">
                        <label className="block font-semibold">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold">Apellido</label>
                        <input
                            type="text"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold">Correo</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                    </div>
                </div>

                {/* Columna de Información Adicional */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Información Adicional</h2>
                    <div className="mb-4">
                        <label className="block font-semibold">Descripción</label>
                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold">Ciudad</label>
                        <input
                            type="text"
                            name="ciudad"
                            value={formData.ciudad}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold">Hobbies</label>
                        <select
                            name="hobbies"
                            value={formData.hobbies}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        >
                            <option value="">Selecciona tus hobbies</option>
                            {hobbyOptions.map((hobby, index) => (
                                <option key={index} value={hobby}>
                                    {hobby}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold">Links Sociales</label>
                        <input
                            type="text"
                            name="socialLinks.tiktok"
                            placeholder="TikTok"
                            value={formData.socialLinks.tiktok}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                        <input
                            type="text"
                            name="socialLinks.facebook"
                            placeholder="Facebook"
                            value={formData.socialLinks.facebook}
                            onChange={handleChange}
                            className="border p-2 w-full mt-2"
                        />
                        <input
                            type="text"
                            name="socialLinks.instagram"
                            placeholder="Instagram"
                            value={formData.socialLinks.instagram}
                            onChange={handleChange}
                            className="border p-2 w-full mt-2"
                        />
                    </div>
                </div>

                {/* Botón de Guardar */}
                <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
}
