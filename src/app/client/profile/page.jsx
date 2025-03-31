'use client';
import ProfileInfo from '../components/Perfil/ProfileInfo';
import PostBox from '../components/Perfil/PostBox';
import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';
import LoadingProfile from './LoadingProfile'
import PublicNav from '../components/Perfil/publicNav';
import Layout from '../layout/Layout'


export default function ProfilePage() {
  const [data, setData] = useState(null); // Estado para almacenar datos del usuario
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    
    const fetchData = async () => {
      try {

        const userInfoResponse = await axios.get('/api/auth/user-info');
        const userId = userInfoResponse.data.userId;

        if (!userId) {
          throw new Error('ID del usuario no encontrado en la respuesta del servidor');
        }

        const response = await axios.get(`/api/user/${userId}`);
        setData(response.data);
        setLoading(false); // Finaliza la carga
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Finaliza la carga incluso si hay error
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <main className="mb-24 lg:mb-0">
        <div className="container mx-auto py-2">
          {loading ? <LoadingProfile /> : (
            <>
              <ProfileInfo />
              <PostBox />
              <PublicNav />
            </>
          )}
        </div>
      </main>
    </Layout>
  );
}
