'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Hook para obtener parámetros de la URL
import axios from '../../../../utils/axios'; // Asegúrate de ajustar la ruta
import { toast } from 'react-toastify';
import ImageCover from './components/CoverImage';
import InfoProfile from './components/ProfileInfo';
import NavigationProfile from './components/ProfileNavigation';
import PostUser from './components/PostBox';

const UserProfile = () => {
  const { id } = useParams(); // Obtener el ID del usuario desde la URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/user/${id}`);
        setUser(response.data);
      } catch (error) {
        toast.error('Error al cargar la información del usuario');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return <p>No se encontró la información del usuario.</p>;
  }

  return (    
    <div>
       <main className='my-1 pt-2 pb-2 px-10 max-w-[80vw] flex-1 dark:bg-black rounded-l-lg transition duration-500 ease-in-out overflow-y-auto mx-auto'>
            <ImageCover />
            <div className="container mx-auto px-4 py-4">
              <InfoProfile/>
              <NavigationProfile />
              <PostUser />
              {/* <PublicationGetting/> */}
            </div>
          </main>
    </div>
  );
};

export default UserProfile;
