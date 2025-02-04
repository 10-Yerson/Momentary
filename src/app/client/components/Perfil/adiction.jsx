'use client';

import { useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import { FaPencilAlt, FaSave, FaPlus, FaCity, FaHeart, FaLink } from 'react-icons/fa';

export default function Adiction() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Estado para el modal

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) throw new Error('ID del usuario no encontrado en localStorage');
        const response = await axios.get(`/api/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Si está cargando, mostramos un spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center bg-white bg-opacity-50 w-full min-h-screen">
      <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
    );
  }

  // Si hay un error y no hay usuario
  if (!user) {
    return <p className="text-red-500 text-center">Error al cargar los datos.</p>;
  }


  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-full rounded-2xl bg-white shadow-lg p-7">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Perfil del Usuario
        </h1>
        <div className="flex flex-col items-center gap-6">
          <div
            className="w-32 h-32 rounded-full overflow-hidden shadow-lg cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <img
              src={user.profilePicture || '/default-profile.png'}
              alt="Foto de perfil"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-semibold text-gray-700">
              {user.name} {user.apellido}
            </h2>
            <p className="text-gray-500 italic cursor-pointer flex items-center justify-center gap-2">
              <FaPencilAlt className="text-blue-500" />
              {user.profile.descripcion || 'Añade una descripción...'}
            </p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 cursor-pointer">
          <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
            <FaCity className="text-blue-500 text-2xl mr-4" />
            <div>
              <h3 className="font-semibold text-gray-700">Ciudad</h3>
              <p className="text-gray-600">
                {user.profile.ciudad || 'Añadir Ciudad'}
              </p>
            </div>
          </div>
          <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
            <FaHeart className="text-red-500 text-2xl mr-4" />
            <div>
              <h3 className="font-semibold text-gray-700">Hobbies</h3>
              <p className="text-gray-600">
                {user.profile.hobbies && user.profile.hobbies.length > 0 ? (
                  <>
                    {user.profile.hobbies.slice(0, 3).join(', ')}
                    {user.profile.hobbies.length > 3 && (
                      <span className="text-gray-500"> y {user.profile.hobbies.length - 3} más</span>
                    )}
                  </>
                ) : (
                  'Añadir Hobbies'
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
            <FaLink className="text-green-500 text-2xl mr-4" />
            <div>
              <h3 className="font-semibold text-gray-700">Enlaces Sociales</h3>
              {user.profile.socialLinks && Object.keys(user.profile.socialLinks).length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {Object.entries(user.profile.socialLinks).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Añade enlaces sociales.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="relative">
            {/* Imagen centrada */}
            <img
              src={user.profilePicture || '/default-profile.png'}
              alt="Foto completa"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            />
            {/* Botón de cerrar dentro de la imagen */}
            <button
              className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-50 rounded-full p-2"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
