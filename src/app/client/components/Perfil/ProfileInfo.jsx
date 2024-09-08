'use client';

import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios';
export default function ProfileInfo() {

  const [userName, setUserName] = useState('');
  const [lastname, setLastname] = useState('');
  const [profilePicture, setProfilePicture] = useState('')

  const [data, setdata] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
          throw new Error('ID del usuario no encontrado en sessionStorage');
        }
        const response = await axios.get(`/api/user/${userId}`);
        setdata(response.data);
        setUserName(response.data.name);
        setLastname(response.data.apellido);
        setProfilePicture(response.data.profilePicture);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error cargando datos del usuario');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <img
          alt="Profile picture"
          className="h-24 w-24 rounded-full border-4 border-white object-cover"
          src={profilePicture}
        />
        <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow">
          <i className="fas fa-camera"></i>
        </button>
      </div>
      <div>
        <p className="text-gray-800 text-2xl">
          {userName} <span className="text-gray-600">{lastname}</span>
        </p>

        <div className="flex space-x-2 mt-2">
          <button className="bg-neutral-950 text-white border border-neutral-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md">
            Añadir a historia
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded">Editar perfil</button>
          <button className="bg-gray-200 px-4 py-2 rounded">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
