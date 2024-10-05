'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Hook para obtener parámetros de la URL
import axios from '../../../../utils/axios'; // Asegúrate de ajustar la ruta
import { toast } from 'react-toastify';
import ProfileHeader from './components/ProfileHeader';
import ProfileBio from './components/ProfileBio';
import ProfileHighlights from './components/ProfileHighlights';
import ProfileTabs from './components/ProfileTabs';
import ProfilePost from './components/ProfilePost';

const UserProfile = () => {
  // const { id } = useParams(); // Obtener el ID del usuario desde la URL
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get(`/api/user/${id}`);
  //       setUser(response.data);
  //     } catch (error) {
  //       toast.error('Error al cargar la información del usuario');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (id) {
  //     fetchUser();
  //   }
  // }, [id]);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="spinner">Cargando...</div>
  //     </div>
  //   );
  // }

  // if (!user) {
  //   return <p>No se encontró la información del usuario.</p>;
  // }

  return (

    <main className='my-1 pt-2 pb-2 px-10 max-w-[80vw] flex-1 dark:bg-black rounded-l-lg transition duration-500 ease-in-out overflow-y-auto mx-auto'>
      <ProfileHeader />
      <ProfileBio />
      {/* <ProfileHighlights /> */}
      <ProfileTabs />
      <ProfilePost />

    </main>

  );
};

export default UserProfile;
