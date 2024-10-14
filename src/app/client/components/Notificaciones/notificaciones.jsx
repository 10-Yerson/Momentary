'use client';

import React, { useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import Link from 'next/link';

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications');
        setNotifications(response.data);
        console.log('Respuesta Data ', response.data)
      } catch (error) {
        console.error('Error al obtener notificaciones:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="w-full md:w-1/2 p-4">
      <h2 className="text-lg font-bold mb-4">Notificaciones</h2>
      <div className="space-y-4">
        {isLoading ? (
          <p>Cargando notificaciones...</p>
        ) : notifications.length === 0 ? (
          <p>No tienes notificaciones.</p>
        ) : (
          notifications.map((notification) => (
            <div key={notification._id} className="bg-gray-100 p-3 rounded shadow flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500 pb-2">{new Date(notification.createdAt).toLocaleString()}</p>
                <Link href={`/client/userprofile/${notification.sender._id}`}>
                  <p className="text-sm font-semibold">
                    {notification.sender.name} {notification.sender.apellido} te ha seguido.
                  </p>
                </Link>

              </div>
              <div>
                <Link href={`/client/userprofile/${notification.sender._id}`}>
                  <img className='object-cover h-12 w-12 rounded-full'
                    src={notification.sender.profilePicture} alt="img" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
