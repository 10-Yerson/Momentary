'use client'

import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios';
import Createpublication from '../Modal/Createpublication';

export default function PostBox() {
  const [userName, setUserName] = useState('');
  const [lastname, setLastname] = useState('');
  const [profilePicture, setProfilePicture] = useState('')
  const [data, setdata] = useState([])
  const [isModalOpen, setModalOpen] = useState(false);

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
      }
    };

    fetchData();
  }, []);
  
    return (
      <div className="mt-4 bg-white p-4 rounded">
        <div className="flex items-center space-x-4">
          <img
            alt="User profile picture"
            className="h-10 w-10 rounded-full object-cover"
            src={profilePicture  || 'https://placehold.co/40x40'}
          />
          <input onClick={() => setModalOpen(true)}
            className="w-full p-2 bg-gray-50 rounded-full"
            placeholder="¿Qué estás pensando?"
            type="text"  readOnly 
          />
          <Createpublication isOpen={isModalOpen} onClose={() => setModalOpen(false)}/>
        </div>
      </div>
    );
  }
  