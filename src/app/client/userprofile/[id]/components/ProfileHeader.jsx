'use client';

import axios from '../../../../../utils/axios';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCog } from 'react-icons/fa';
import UserSeguidores from './UserSeguidores';
import UserSeguidos from './UserSeguidos';

export default function ProfileHeader() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowedBy, setIsFollowedBy] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [OpenIs, setOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/user/${id}`);
        setUser(response.data);
        const currentUserId = localStorage.getItem('userId');

        // Actualizar el estado de `isFollowing` y `isFollowedBy` basado en la respuesta
        setIsFollowing(response.data.followers.includes(currentUserId));
        setIsFollowedBy(response.data.following.includes(currentUserId));
      } catch (error) {
        console.error(error);
        toast.error('Error al cargar la información del usuario');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await axios.post(`/api/followers/dejar-seguir/${id}`);
        setIsFollowing(false);
        // toast.success('Dejaste de seguir a este usuario');
      } else {
        await axios.post(`/api/followers/seguir/${id}`);
        setIsFollowing(true);
        // toast.success('Ahora sigues a este usuario');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error al actualizar el estado de seguimiento');
    }
  };

  // Función para navegar al chat con la información del usuario
  const navigateToChat = () => {
    if (user) {
      // Guardamos la información del usuario en localStorage para recuperarla en la página de mensajes
      localStorage.setItem('chatWithUser', JSON.stringify({
        _id: id,
        name: user.name,
        apellido: user.apellido,
        profilePicture: user.profilePicture || "https://res.cloudinary.com/dbgj8dqup/image/upload/v1725640005/uploads/ktsngfmjvjv094hygwsu.png"
      }));
      
      // Navegamos a la página de mensajes
      router.push('/client/messages');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-row gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
          <div className="w-7 h-7 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
          <div className="w-7 h-7 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        </div>
      </div>
    );
  }

  // Determinar el texto del botón de acuerdo a los estados
  const followButtonText = isFollowing
    ? 'Siguiendo'
    : isFollowedBy
      ? 'Seguir de vuelta'
      : 'Seguir';

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const Modaltoggle = () => {
    setOpen(!OpenIs);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white py-6 md:pt-8 lg:pt-10 md:pb-5 lg:pb-5 rounded-xl">
      <div className="flex flex-col md:flex-row items-center text-center md:text-left w-full">
        <img
          alt="Profile picture of user"
          className="rounded-full border border-gray-300 shadow-lg w-32 h-32 md:w-40 md:h-40 object-cover"
          src={
            user.profilePicture ||
            "https://res.cloudinary.com/dbgj8dqup/image/upload/v1725640005/uploads/ktsngfmjvjv094hygwsu.png"
          }
        />

        <div className="mt-4 md:mt-0 md:ml-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {user.name} {user.apellido}
          </h2>

          <div className="flex justify-center md:justify-start gap-4 md:gap-6 mt-2 text-gray-700 text-sm sm:text-base md:text-lg">
            <div><span className="font-bold">{user.postsCount || 0}</span> publicaciones</div>
            <div onClick={toggleModal} className="cursor-pointer hover:text-gray-800 transition">
              <span className="font-bold">{user.followers.length || 0}</span> seguidores
            </div>
            <div onClick={Modaltoggle} className="cursor-pointer hover:text-gray-800 transition">
              <span className="font-bold">{user.following.length || 0}</span> seguidos
            </div>
          </div>

          <UserSeguidores isOpen={isOpen} toggleModal={toggleModal} />
          <UserSeguidos OpenIS={OpenIs} Modaltoggle={Modaltoggle} />

          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-2">
            <button
              className={`px-4 py-1 md:px-6 md:py-2 rounded-lg text-sm md:text-md font-semibold transition ${isFollowing
                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              onClick={handleFollowToggle}
            >
              {followButtonText}
            </button>
            <button 
              className="px-4 py-1 md:px-6 md:py-2 bg-gray-200 text-gray-800 rounded-lg text-sm md:text-md font-semibold hover:bg-gray-300 transition"
              onClick={navigateToChat}
            >
              Enviar mensaje
            </button>
            <button className="p-2 text-gray-800 rounded-lg hover:bg-gray-200 transition">
              <FaCog size={20} />
            </button>
          </div>

        </div>
      </div>
      <ToastContainer />
    </div>

  );
}
