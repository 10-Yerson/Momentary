'use client'
import { useEffect, useState } from 'react';
import axios from '../../../../utils/axios';

export default function EditPerfil() {
    const [user, setUser] = useState(null);
    const [selectedSection, setSelectedSection] = useState('profile');
    const [formData, setFormData] = useState({
        name: '',
        apellido: '',
        email: '',
        password: '',
        fechaNacimiento: '',
        genero: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {

                const userInfoResponse = await axios.get('/api/auth/user-info');
                const userId = userInfoResponse.data.userId;

                if (!userId) {
                    throw new Error('ID del usuario no encontrado en la respuesta del servidor');
                }
                const response = await axios.get(`/api/user/${userId}`);
                const userData = response.data;

                // Asegúrate de que la fecha esté en formato YYYY-MM-DD
                const formattedFechaNacimiento = userData.profile?.fechaNacimiento
                    ? new Date(userData.profile.fechaNacimiento).toISOString().split('T')[0]
                    : '';

                setUser(userData);
                setFormData({
                    ...formData,
                    name: userData.name || '',
                    apellido: userData.apellido || '',
                    email: userData.email || '',
                    password: '',
                    profilePicture: userData.profilePicture || '',
                    fechaNacimiento: formattedFechaNacimiento,
                    genero: userData.profile.genero,
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const userInfoResponse = await axios.get('/api/auth/user-info');
            const userId = userInfoResponse.data.userId;

            if (!userId) {
                throw new Error('ID del usuario no encontrado en la respuesta del servidor');
            }
            const response = await axios.put(`/api/user/${userId}`, formData);

            setUser(response.data); // Actualiza el estado local con los datos actualizados
            alert('Perfil actualizado exitosamente');
        } catch (error) {
            console.error('Error actualizando el perfil:', error);
            alert('Hubo un error al actualizar el perfil.');
        }
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div className="w-full mx-auto px-5 py-7">
            {/* <h1 className="text-2xl font-bold mb-5">Editar Perfil</h1> */}

            {/* Menú de secciones */}
            <div className="flex justify-around  mb-8">
                <button
                    className={`px-4 py-2 font-semibold ${selectedSection === 'profile' ? 'border-b-2 border-blue-500' : ''} text-xl`}
                    onClick={() => setSelectedSection('profile')}
                >
                    Perfil
                </button>
                <button
                    className={`px-4 py-2 font-semibold ${selectedSection === 'accessData' ? 'border-b-2 border-blue-500' : ''} text-xl`}
                    onClick={() => setSelectedSection('accessData')}
                >
                    Datos de Acceso
                </button>
            </div>

            <div>
                {selectedSection === 'profile' && (
                    <div className="flex flex-col md:flex-col lg:flex-row lg:space-x-8 mb-8">
                        <div className="w-full lg:w-1/2">
                            <div className="grid grid-cols-1 gap-6">
                                {/* Nombre */}
                                <div>
                                    <label className="block font-semibold text-gray-700 mb-2">Nombre</label>
                                    <input
                                        value={formData.name} name="name"
                                        onChange={handleChange}
                                        type="text"
                                        className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                        placeholder="Nombre"
                                    />
                                </div>

                                {/* Apellido */}
                                <div>
                                    <label className="block font-semibold text-gray-700 mb-2">Apellido</label>
                                    <input
                                        value={formData.apellido} name="apellido"
                                        onChange={handleChange}
                                        type="text"
                                        className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                        placeholder="Apellido"
                                    />
                                </div>

                                {/* Fecha de Nacimiento */}
                                <div>
                                    <label className="block font-semibold text-gray-700 mb-2">Fecha de Nacimiento</label>
                                    <input
                                        name="fechaNacimiento"
                                        value={formData.fechaNacimiento}
                                        onChange={handleChange}
                                        type="date"
                                        className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    />
                                </div>

                                {/* Género */}
                                <div>
                                    <label className="block font-semibold text-gray-700 mb-2">Género</label>
                                    <select
                                        name="genero"
                                        value={formData.genero}
                                        onChange={handleChange}
                                        className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    >
                                        <option>Seleccionar genero</option>
                                        <option>Masculino</option>
                                        <option>Femenino</option>
                                        <option>Otro</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Sección de imagen de perfil */}
                        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center mt-8 lg:mt-0">
                            <div className="relative w-96 h-96 mb-4">
                                <img
                                    src={formData.profilePicture}
                                    alt="Imagen de perfil"
                                    className="w-full h-full rounded-full object-cover border-4 border-gray-300 shadow-lg"
                                />
                            </div>

                            <div className="flex space-x-4">
                                <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300">
                                    Actualizar
                                </button>
                                <button className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>

                )}

                {selectedSection === 'accessData' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">Correo</label>
                            <input
                                value={formData.email}
                                type="text" className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                placeholder="Correo"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">Contraseña</label>
                            <input type="password" className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" placeholder="Contraseña" />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">Confirmar Contraseña</label>
                            <input type="password" className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" placeholder="Confirmar Contraseña" />
                        </div>
                    </div>
                )}

            </div>
            <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded mt-4">Guardar</button>
        </div>
    );
}
