'use client'
import Link from 'next/link';
import axios from '../../../../utils/axios'
import React, { useEffect, useState } from "react";

export default function ModalProfile({ isOpen, onClose }) {
  // Inicializa los estados fuera de cualquier condición
  const [data, setData] = useState(null);
  const [userName, setUserName] = useState('');
  const [lastname, setLastname] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    if (!isOpen) return; 

    const fetchData = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
          throw new Error('ID del usuario no encontrado en sessionStorage');
        }
        const response = await axios.get(`/api/user/${userId}`);
        setData(response.data);
        setUserName(response.data.name);
        setLastname(response.data.apellido);
        setProfilePicture(response.data.profilePicture);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isOpen]); 

  if (!isOpen) return null;

    return (
        <div className="absolute right-6 top-16 w-80 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center p-4 border-b">
                <Link className='flex justify-center items-center gap-x-5'
                    href="/client/profile">
                    <img
                        className="h-12 w-12 rounded-full object-cover cursor-pointer"
                        src={profilePicture}
                    />
                    <p className="text-gray-800 text-xl">
                        {userName} <span className="text-gray-600">{lastname}</span>
                    </p>
                </Link>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="p-4">
                <button className="w-full text-left py-2 hover:bg-gray-100">
                    Configuración y privacidad
                </button>
                <button className="w-full text-left py-2 hover:bg-gray-100">
                    Ayuda y asistencia
                </button>
                <button className="w-full text-left py-2 hover:bg-gray-100">
                    Enviar comentarios
                </button>
                <button className="w-full text-left py-2 hover:bg-gray-100">
                    Cerrar sesión
                </button>
            </div>

            <div className="p-2 text-xs text-gray-400 text-center">
                Privacidad · Condiciones · Publicidad · Más · Meta © 2024
            </div>
        </div>
    );
}

{/* <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-80">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <h2 className="text-lg font-semibold">Jerson Wall</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        &times;
                    </button>
                </div>

                <div className="p-4">
                    <div className="flex items-center space-x-3 mb-4">
                        <img
                            className="w-12 h-12 rounded-full"
                            src="https://via.placeholder.com/150"
                            alt="Jerson Wall"
                        />
                        <div>
                            <h3 className="font-semibold text-gray-800">Jerson Wall</h3>
                            <a href="#" className="text-sm text-blue-500">Ver todos los perfiles</a>
                        </div>
                    </div>

                    <ul className="space-y-4">
                        <li className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
                            <span className="material-icons text-gray-500">settings</span>
                            <span>Configuración y privacidad</span>
                        </li>
                        <li className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
                            <span className="material-icons text-gray-500">help_outline</span>
                            <span>Ayuda y asistencia</span>
                        </li>
                        <li className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
                            <span className="material-icons text-gray-500">brightness_4</span>
                            <span>Pantalla y accesibilidad</span>
                        </li>
                        <li className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
                            <span className="material-icons text-gray-500">feedback</span>
                            <span>Enviar comentarios</span>
                        </li>
                        <li className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
                            <span className="material-icons text-gray-500">logout</span>
                            <span>Cerrar sesión</span>
                        </li>
                    </ul>
                </div>

                <div className="px-4 py-3 text-xs text-gray-500 border-t">
                    <p>Privacidad · Condiciones · Publicidad · Opciones de anuncios · Cookies · Más · Meta © 2024</p>
                </div>
            </div>
        </div> */}