'use client';

import { useState, useEffect } from 'react';
import axios from '../../../utils/axios';
import ProtectedRoute from '../../../components/protected/ProtectedRoute'
import CoverImage from '../components/Perfil/CoverImage';
import ProfileInfo from '../components/Perfil/ProfileInfo';
import ProfileNavigation from '../components/Perfil/ProfileNavigation';
import PostBox from '../components/Perfil/PostBox';
import PublicationGetting from '../components/Perfil/publication';


export default function ProfilePage() {

  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
          throw new Error('ID del usuario no encontrado en sessionStorage');
        }
        const userResponse = await axios.get(`/api/user/${userId}`);
        setUserData(userResponse.data);
        setUserName(userResponse.data.name || '');
        console.log('Datos Usuario', userResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error cargando datos del usuario');
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <ProtectedRoute roles={['user']}>
        <div className='flex justify-center'>
          <main className='my-1 pt-2 pb-2 px-10 max-w-[80vw] flex-1 dark:bg-black rounded-l-lg transition duration-500 ease-in-out overflow-y-auto mx-auto'>
            <CoverImage />
            <div className="container mx-auto px-4 py-4">
              <ProfileInfo/>
              <ProfileNavigation />
              <PostBox />
              <PublicationGetting/>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    </>
  );
}
