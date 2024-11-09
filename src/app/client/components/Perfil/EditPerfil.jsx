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
        descripcion: '',
        fechaNacimiento: '',
        genero: '',
        ciudad: '',
        hobbies: [],
        socialLinks: {
            tiktok: '',
            facebook: '',
            instagram: ''
        }
    });

    const hobbiesList = [
        "Lectura", "Deportes", "Música", "Cine", "Viajar", "Cocina",
        "Fotografía", "Pintura", "Videojuegos", "Yoga", "Jardinería",
        "Senderismo", "Natación", "Danza", "Escritura",
    ];

    // Función para manejar la selección de hobbies
    const handleHobbySelect = (e) => {
        const selectedHobby = e.target.value;
        if (selectedHobby && !formData.hobbies.includes(selectedHobby)) {
            setFormData({
                ...formData,
                hobbies: [...formData.hobbies, selectedHobby]
            });
        }
    };

    // Función para eliminar un hobby seleccionado
    const removeHobby = (hobbyToRemove) => {
        setFormData({
            ...formData,
            hobbies: formData.hobbies.filter(hobby => hobby !== hobbyToRemove)
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    throw new Error('ID del usuario no encontrado en localStorage');
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
                    descripcion: userData.profile.descripcion || '',
                    ciudad: userData.profile.ciudad || '',
                    hobbies: userData.profile.hobbies || [],
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
        <div className="w-full mx-auto p-5">
            <h1 className="text-2xl font-bold mb-5">Editar Perfil</h1>

            {/* Menú de secciones */}
            <div className="flex justify-between mb-8">
                <button
                    className={`px-4 py-2 font-semibold ${selectedSection === 'profile' ? 'border-b-2 border-blue-500' : ''} w-full sm:w-auto`}
                    onClick={() => setSelectedSection('profile')}
                >
                    Perfil
                </button>
                <button
                    className={`px-4 py-2 font-semibold ${selectedSection === 'accessData' ? 'border-b-2 border-blue-500' : ''} w-full sm:w-auto`}
                    onClick={() => setSelectedSection('accessData')}
                >
                    Datos de Acceso
                </button>
                <button
                    className={`px-4 py-2 font-semibold ${selectedSection === 'additionalInfo' ? 'border-b-2 border-blue-500' : ''} w-full sm:w-auto`}
                    onClick={() => setSelectedSection('additionalInfo')}
                >
                    Información Adicional
                </button>
                <button
                    className={`px-4 py-2 font-semibold ${selectedSection === 'hobbies' ? 'border-b-2 border-blue-500' : ''} w-full sm:w-auto`}
                    onClick={() => setSelectedSection('hobbies')}
                >
                    Hobbies
                </button>
                <button
                    className={`px-4 py-2 font-semibold ${selectedSection === 'socialLinks' ? 'border-b-2 border-blue-500' : ''}w-full sm:w-auto`}
                    onClick={() => setSelectedSection('socialLinks')}
                >
                    Links Sociales
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

                {selectedSection === 'additionalInfo' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">Descripción</label>
                            <textarea 
                            type="text" name="descripcion"
                            value={formData.descripcion}onChange={handleChange}

                            className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" placeholder="Descripción"></textarea>
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">Ciudad</label>
                            <input
                            name="ciudad"
                            value={formData.ciudad}
                            onChange={handleChange}
                             type="text" className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" placeholder="Ciudad" />
                        </div>
                    </div>
                )}

                {selectedSection === 'hobbies' && (
                    <div className="mb-8">
                    <label className="block font-semibold text-gray-700 mb-2">Hobbies</label>
                    <select
                        className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        onChange={handleHobbySelect}
                        defaultValue=""
                    >
                        <option disabled value="">Selecciona tus hobbies</option>
                        {hobbiesList.map((hobby, index) => (
                            <option key={index} value={hobby}>
                                {hobby}
                            </option>
                        ))}
                    </select>
        
                    {/* Lista de hobbies seleccionados */}
                    <div className="mt-4">
                        {formData.hobbies.map((hobby, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between rounded-lg p-2 mb-2 bg-gray-50"
                            >
                                <span className="text-gray-700">{hobby}</span>
                                <button
                                    onClick={() => removeHobby(hobby)}
                                    className="ml-4 text-black font-bold"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                )}

                {selectedSection === 'socialLinks' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div>
                            <label  className="block font-semibold text-gray-700 mb-2">TikTok</label>
                            <input type="url" className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" placeholder="TikTok" />
                        </div>
                        <div>
                            <label  className="block font-semibold text-gray-700 mb-2">Facebook</label>
                            <input type="url" className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" placeholder="Facebook" />
                        </div>
                        <div>
                            <label  className="block font-semibold text-gray-700 mb-2">Instagram</label>
                            <input type="url" className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" placeholder="Instagram" />
                        </div>
                    </div>
                )}
            </div>
            <button onClick={handleSubmit}  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded mt-4">Guardar</button>
        </div>
    );
}
