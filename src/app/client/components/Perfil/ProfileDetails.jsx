import React from 'react';

export default function ProfileDetails() {
    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Detalles</h2>
            <ul className="space-y-2">
                <li>Vive en Popayán</li>
                <li>Editar detalles</li>
                <li>Añadir destacados</li>
            </ul>
        </div>
    );
}
