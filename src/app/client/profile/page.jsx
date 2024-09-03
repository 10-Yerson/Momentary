'use client';

import { useState, useEffect } from 'react';
import axios from '../../../utils/axios';
import ProtectedRoute from '../../../components/protected/ProtectedRoute'


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
        <div className='h-screen flex justify-center'>
          <main className='my-1 pt-2 pb-2 px-10 max-w-[80vw] flex-1 dark:bg-black rounded-l-lg transition duration-500 ease-in-out overflow-y-auto mx-auto'>
            <div
              className="w-full bg-gray-300 h-80 relative bg-cover bg-center rounded-lg"
              style={{ backgroundImage: `url('https://s1.1zoom.me/b5340/13/Footbal_Russia_FIFA_World_Cup_2018_Adidas_Telstar_549120_2560x1440.jpg')` }}
            >
              <button className="absolute bottom-4 right-4 bg-white p-2 rounded shadow">
                <i className="fas fa-camera"></i>
                Añadir foto de portada
              </button>
            </div>
            <div class="container mx-auto px-4 py-4">
              <div class="flex items-center space-x-4">
                <div class="relative">
                  <img alt="Profile picture"
                    class="h-24 w-24 rounded-full border-4 border-white object-cover"
                    src="https://metro.co.uk/wp-content/uploads/2018/09/sei_30244558-285d.jpg?quality=90&strip=all" />
                  <button class="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow">
                    <i class="fas fa-camera">
                    </i>
                  </button>
                </div>
                <div>
                  <h1 class="text-2xl">
                    {userName}
                  </h1>
                  <div class="flex space-x-2 mt-2">
                    <button class="bg-blue-600 text-white px-4 py-2 rounded">
                      Añadir a historia
                    </button>
                    <button class="bg-gray-200 px-4 py-2 rounded">
                      Editar perfil
                    </button>
                    <button class="bg-gray-200 px-4 py-2 rounded">
                      <i class="fas fa-ellipsis-h">
                      </i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <ul class="flex space-x-4 border-b">
                  <li class="py-2 px-4 border-b-2 border-blue-600">
                    Publicaciones
                  </li>
                  <li class="py-2 px-4">
                    Información
                  </li>
                  <li class="py-2 px-4">
                    Amigos
                  </li>
                  <li class="py-2 px-4">
                    Fotos
                  </li>
                  <li class="py-2 px-4">
                    Vídeos
                  </li>
                  <li class="py-2 px-4">
                    Reels
                  </li>
                  <li class="py-2 px-4">
                    Ver más
                  </li>
                </ul>
              </div>
              <div class="mt-4 bg-white p-4 rounded shadow">
                <div class="flex items-center space-x-4">
                  <img alt="User profile picture" class="h-10 w-10 rounded-full" height="40" src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-Hh5RPsKhtBPsWCFSiEKnUJ6x/user-8qgiVpCV0U0b7zDjfFInHgjl/img-DMVW7mGeExzL7tJv4fv8mo8q.png?st=2024-09-02T22%3A22%3A14Z&amp;se=2024-09-03T00%3A22%3A14Z&amp;sp=r&amp;sv=2024-08-04&amp;sr=b&amp;rscd=inline&amp;rsct=image/png&amp;skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&amp;sktid=a48cca56-e6da-484e-a814-9c849652bcb3&amp;skt=2024-09-01T23%3A52%3A28Z&amp;ske=2024-09-02T23%3A52%3A28Z&amp;sks=b&amp;skv=2024-08-04&amp;sig=egiSrsoAHMba/jbPYs1YB0zSBBWEEoOs2IhKPRJCJLc%3D" width="40" />
                  <input class="w-full p-2 bg-gray-200 rounded-full" placeholder="¿Qué estás pensando?" type="text" />
                </div>
              </div>
              
            </div>
          </main>
        </div>
      </ProtectedRoute>
    </>
  );
}
