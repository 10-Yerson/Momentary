'use client'

import React, { useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import { io } from 'socket.io-client';

export default function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Obtener notificaciones cuando se monta el componente
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error al obtener notificaciones:', error);
      }
    };
    fetchNotifications();

    // Conectar a Socket.io para notificaciones en tiempo real
    const socket = io(process.env.NEXT_PUBLIC_BASE_URL);
    // Cambia esto a la URL del servidor si está en producción

    socket.on('newNotification', (newNotification) => {
      setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
    });

    // Limpiar la conexión cuando el componente se desmonta
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="w-full md:w-1/2 p-4">
      <h2 className="text-lg font-bold mb-4">Notificaciones</h2>
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p>No tienes notificaciones.</p>
        ) : (
          notifications.map((notification) => (
            <div key={notification._id} className="bg-gray-100 p-3 rounded shadow">
              <p className="text-sm font-semibold">
                {notification.sender.name} te ha seguido.
              </p>
              <p className="text-xs text-gray-500">{notification.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
