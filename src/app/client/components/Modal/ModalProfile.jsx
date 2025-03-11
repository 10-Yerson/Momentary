'use client';

import React from "react";
import { useRouter } from "next/navigation";

export default function ModalProfile({ isOpen, onClose }) {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        router.push('/');
    };

    if (!isOpen) return null;

    return (
        <div className="absolute right-6 top-16 w-80 bg-white shadow-lg rounded-lg z-50">
            <div className="px-3 py-3 absolute right-0">
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="p-4 pt-5">
                <button className="w-full text-left py-2">
                    Configuración y privacidad
                </button>
                <button className="w-full text-left py-2">
                    Ayuda y asistencia
                </button>
                <button className="w-full text-left py-2">
                    Enviar comentarios
                </button>
                <button
                    onClick={handleLogout}
                    className="w-full text-left py-2"
                >
                    Cerrar sesión
                </button>
            </div>

            <div className="p-2 text-xs text-gray-400 text-center">
                Privacidad · Condiciones · Publicidad · Más · Momentary © 2024
            </div>
        </div>
    );
}

