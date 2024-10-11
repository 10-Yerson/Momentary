'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation'; // Hook para obtener parámetros de la URL
import axios from '../../../../utils/axios'; // Asegúrate de ajustar la ruta
import { toast } from 'react-toastify';
import ProfileHeader from './components/ProfileHeader';
import ProfileBio from './components/ProfileBio';
import ProfileHighlights from './components/ProfileHighlights';
import ProfileTabs from './components/ProfileTabs';
import ProfilePost from './components/ProfilePost';
import { MyProvider, useState } from '../../context/MyContext';
import UserPanel from '../../components/Dasboard/siderbar';

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
    <MyProvider>
      <UserPanel />
      <main className='flex overflow-hidden select-none md:ml-40 ml-0 flex-1 flex-col'>
        <ProfileHeader />
        <ProfileBio />
        <ProfileTabs />
        <ProfilePost />
      </main>
    </MyProvider>

  );
};

export default UserProfile;
