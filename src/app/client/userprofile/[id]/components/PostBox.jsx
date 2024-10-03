'use client';

import { useState, useEffect } from 'react';
import axios from '../../../../../utils/axios';
import { useParams } from 'next/navigation'; 
import { toast } from 'react-toastify'; // Asegúrate de importar toast

export default function PostUser() {
  const { id } = useParams(); // Obtener el ID del usuario desde la URL
  const [user, setUser] = useState(null); // Estado para el usuario

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/user/${id}`);
        setUser(response.data);
        console.log('User Data:', response.data); // Verifica los datos del usuario
      } catch (error) {
        toast.error('Error al cargar la información del usuario');
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  return (
    <div className="mt-4 bg-white p-4 rounded shadow">
      <div className="flex items-center space-x-4">
        <img
          alt="User profile picture"
          className="h-10 w-10 rounded-full object-cover"
          src={user?.profilePicture || 'https://placehold.co/40x40'} // Usar optional chaining
        />
        <input 
          className="w-full p-2 bg-gray-200 rounded-full"
          placeholder="¿Qué estás pensando?"
          type="text"  
          readOnly 
        />
      </div>
    </div>
  );
}  
