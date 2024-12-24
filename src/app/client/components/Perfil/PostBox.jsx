'use client';

import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios';
import Createpublication from '../Modal/Createpublication';
import Link from 'next/link';
import { FaPencilAlt, FaSave, FaPlus, FaCity, FaHeart, FaLink , FaAlignLeft, FaInfoCircle   } from 'react-icons/fa';

export default function PostBox() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(null); // Estado inicial null para diferenciar cuando no hay datos
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('ID del usuario no encontrado en localStorage');
        }
        const response = await axios.get(`/api/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Finalizar el loading tras la carga
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full justify-around">
      <div className="w-full md:w-1/2 space-y-4 px-4 py-2 bg-white rounded-lg">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-32 space-y-2">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-500 h-10 w-10 animate-spin"></div>
            <p className="text-sm font-medium text-gray-600">Cargando información...</p>
          </div>
        ) : (
          <>
            {user && (user.profile?.descripcion || user.profile?.ciudad || user.profile?.hobbies?.length > 0 || user.profile?.socialLinks) ? (
              <>
                {user.profile?.descripcion && (
                  <div className="flex items-center">
                    <Link href="/client/adiction" className="flex space-x-4">
                      <FaInfoCircle    className="text-gray-600 text-2xl" />
                      <p className="text-gray-700 font-medium">{user.profile?.descripcion}</p>
                    </Link>
                  </div>
                )}
                {user.profile?.ciudad && (
                  <div className="flex items-center">
                    <Link href="/client/adiction" className="flex space-x-4">
                      <FaCity className="text-gray-600 text-2xl" />
                      <p className="text-gray-700 font-medium">{user.profile?.ciudad}</p>
                    </Link>
                  </div>
                )}
                {user.profile?.socialLinks && (
                  <div className="flex space-x-3">
                    <FaLink className="text-gray-600 text-2xl" />
                    {user.profile?.socialLinks?.facebook && (
                      <a
                        href={user.profile?.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition transform"
                      >
                        <img
                          className="object-contain h-6 w-6"
                          src="/img/icons/facebook.png"
                          alt="Facebook"
                        />
                      </a>
                    )}
                    {user.profile?.socialLinks?.instagram && (
                      <a
                        href={user.profile?.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition transform"
                      >
                        <img
                          className="object-contain h-6 w-6"
                          src="/img/icons/instagram.png"
                          alt="Instagram"
                        />
                      </a>
                    )}
                    {user.profile?.socialLinks?.tiktok && (
                      <a
                        href={user.profile?.socialLinks.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition transform"
                      >
                        <img
                          className="object-contain h-6 w-6"
                          src="/img/icons/youtube.png"
                          alt="Tiktok"
                        />
                      </a>
                    )}
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500 text-sm">
                Agrega información adicional para personalizar tu perfil.
              </p>
            )}
            {/* Enlace fijo */}
            <Link href="/client/adiction" className="flex space-x-4">
              <img className="object-cover w-5 h-5" src="/img/icons/more.png" alt="Más información" />
              <p className="text-blue-600 font-semibold hover:underline cursor-pointer">Ver más sobre ti</p>
            </Link>
          </>
        )}
      </div>
      <div className="w-full md:w-1/2 px-3">
        <div className="mt-4 bg-white rounded">
          <div className="flex items-center space-x-4">
            <img
              onClick={() => setModalOpen(true)}
              alt="User profile picture"
              className="h-10 w-10 object-cover opacity-95"
              src="\img\icons\gallery.png"
            />
            <input
              onClick={() => setModalOpen(true)}
              className="w-full p-2 bg-gray-100 rounded-full"
              placeholder="Crea una publicación..."
              type="text"
              readOnly
            />
            <Createpublication isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
          </div>
        </div>
      </div>
      
    </div>
  );
}

{/* <div className='w-full md:w-1/2'>

  <div className="w-64 bg-white p-6 space-y-3 relative overflow-hidden shadow-md"
    onClick={() => setModalOpen(true)}
  >
    <div className="w-24 h-24 bg-black rounded-full absolute -right-5 -top-7 opacity-90">
      <p className="absolute bottom-6 left-7 text-white text-2xl">01</p>
    </div>
    <div className="fill-black w-11">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Layer_1"
        data-name="Layer 1"
        viewBox="0 0 24 24"
      >
        <path
          d="m24,6.928v13.072h-11.5v3h5v1H6.5v-1h5v-3H0V4.5c0-1.379,1.122-2.5,2.5-2.5h12.98c-.253.295-.54.631-.856,1H2.5c-.827,0-1.5.673-1.5,1.5v14.5h22v-10.993l1-1.079Zm-12.749,3.094C19.058.891,19.093.855,19.11.838c1.118-1.115,2.936-1.113,4.052.002,1.114,1.117,1.114,2.936,0,4.052l-8.185,8.828c-.116,1.826-1.623,3.281-3.478,3.281h-5.59l.097-.582c.043-.257,1.086-6.16,5.244-6.396Zm2.749,3.478c0-1.379-1.122-2.5-2.5-2.5-2.834,0-4.018,3.569-4.378,5h4.378c1.378,0,2.5-1.121,2.5-2.5Zm.814-1.073l2.066-2.229c-.332-1.186-1.371-2.057-2.606-2.172-.641.749-1.261,1.475-1.817,2.125,1.117.321,1.998,1.176,2.357,2.277Zm.208-5.276c1.162.313,2.125,1.134,2.617,2.229l4.803-5.18c.737-.741.737-1.925.012-2.653-.724-.725-1.908-.727-2.637,0-.069.08-2.435,2.846-4.795,5.606Z"
        ></path>
      </svg>
    </div>
    <h1 className="font-bold text-xl">¡Publica algo increíble!</h1>
    <p class="text-sm text-zinc-500 leading-6">
  Comparte tus ideas y fotos. Sube tu contenido y deja que el mundo lo descubra. ¡Es tu momento!
</p> 
  </div>
  <Createpublication isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
</div> */}