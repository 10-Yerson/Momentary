'use client';

import React from "react";
import { useRouter } from "next/navigation";
import axios from '../../../../utils/axios'
import { LogOut, CheckCircle, MessageSquare } from "lucide-react";

export default function ModalProfile({ isOpen, onClose }) {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout', {}, { withCredentials: true }); // Llamar al backend para cerrar sesión
            router.push('/');
            console.log("Sesión cerrada correctamente");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const goToVerification = () => {
        router.push('/client/verificacion');
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

            <div className="p-4 pt-10 space-y-2">
                <button
                    onClick={goToVerification}
                    className="flex items-center gap-3 w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 transition"
                >
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-800 font-medium">Verificación cuenta
                    </span>
                </button>

                <button className="flex items-center gap-3 w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 transition">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                    <span className="text-gray-800 font-medium">Enviar comentarios</span>
                </button>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 transition"
                >
                    <LogOut className="w-5 h-5 text-red-600" />
                    <span className="text-gray-800 font-medium">Cerrar sesión</span>
                </button>
            </div>

            <div className="p-2 text-xs text-gray-400 text-center">
                Privacidad · Condiciones · Publicidad · Más · Momentary © 2024
            </div>
        </div>
    );
}

