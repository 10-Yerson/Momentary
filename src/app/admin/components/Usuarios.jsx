'use client';

import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';

export default function Usuarios() {
    const [userInfo, setUserInfo] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/user/`);
                setUserInfo(response.data); 
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
                setError('No se pudo cargar la información de los usuarios.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5">

            {loading ? (
                <div className='grid place-content-center w-full h-screen'>
                    <div class="w-32 h-32 relative flex items-center justify-center">
                        <div
                            class="absolute inset-0 rounded-xl bg-blue-500/20 blur-xl animate-pulse"
                        ></div>

                        <div class="w-full h-full relative flex items-center justify-center">
                            <div
                                class="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-spin blur-sm"
                            ></div>

                            <div
                                class="absolute inset-1 bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden"
                            >
                                <div class="flex gap-1 items-center">
                                    <div
                                        class="w-1.5 h-12 bg-cyan-500 rounded-full animate-[bounce_1s_ease-in-out_infinite]"
                                    ></div>
                                    <div
                                        class="w-1.5 h-12 bg-blue-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.1s]"
                                    ></div>
                                    <div
                                        class="w-1.5 h-12 bg-indigo-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.2s]"
                                    ></div>
                                    <div
                                        class="w-1.5 h-12 bg-purple-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.3s]"
                                    ></div>
                                </div>

                                <div
                                    class="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent animate-pulse"
                                ></div>
                            </div>
                        </div>

                        <div
                            class="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full animate-ping"
                        ></div>
                        <div
                            class="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-ping delay-100"
                        ></div>
                        <div
                            class="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-500 rounded-full animate-ping delay-200"
                        ></div>
                        <div
                            class="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-300"
                        ></div>
                    </div>
                </div>

            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Imagen</span>
                            </th>
                            <th scope="col" className="px-6 py-3">Nombre</th>
                            <th scope="col" className="px-6 py-3">Correo</th>
                            <th scope="col" className="px-6 py-3">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userInfo.map((user) => (
                            <tr
                                key={user._id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <td className="p-4">
                                    <img
                                        src={user.profilePicture || "/default-avatar.png"}
                                        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
                                        alt={`Foto de ${user.name}`}
                                    />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {user.name} {user.apellido}
                                </td>
                                <td className="px-6 py-4 text-gray-900 dark:text-white">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    <a
                                        href="#"
                                        className="font-medium text-blue-500 hover:underline"
                                    >
                                        Perfil
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
