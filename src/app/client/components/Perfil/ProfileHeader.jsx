import React from 'react';

export default function ProfileHeader() {
    return (
        <div className="relative w-[90vw]">
            {/* Imagen de portada */}
            <img
                src="https://th.bing.com/th/id/OIP.dddbnQkPz0GwvTzmGF51ewHaEK?rs=1&pid=ImgDetMain" // Imagen de portada
                alt="Portada"
                className="object-cover w-full h-[45vh]"
            />

            {/* Imagen de perfil */}
            <div className="absolute -bottom-12 left-8">
                <img
                    src="https://via.placeholder.com/150" // Imagen de perfil
                    alt="Perfil"
                    className="w-24 h-24 rounded-full border-4 border-white"
                />
            </div>

            <div className="absolute bottom-4 left-8">
                <h1 className="text-2xl font-bold">Jerson Wall</h1>
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Editar perfil</button>
            </div>
        </div>
    );
}
