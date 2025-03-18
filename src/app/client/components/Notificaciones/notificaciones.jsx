'use client';

import React, { useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import Link from 'next/link';
import io from 'socket.io-client';

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  // URL del servidor Socket.io - ajusta según tu configuraciónzzz
  const SOCKET_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications');
        setNotifications(response.data);
        console.log('Respuesta Data inicial:', response.data);
      } catch (error) {
        console.error('Error al obtener notificaciones:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();

    // Inicializar socket para notificaciones en tiempo real
    const initSocket = () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          console.error('No se encontró el ID del usuario en localStorage');
          return;
        }

        const socketInstance = io(SOCKET_URL);
        setSocket(socketInstance);

        socketInstance.emit('join', userId);

        socketInstance.on('newNotification', (notification) => {
          if (!notification || !notification._id) {
            console.error('Notificación recibida sin ID válido:', notification);
            return;
          }

          setNotifications(prevNotifications => {
            const exists = prevNotifications.some(
              notif => notif._id === notification._id
            );

            if (!exists) {
              return [notification, ...prevNotifications];
            }

            return prevNotifications;
          });

          // Mostrar notificación del sistema si está permitido
          if (Notification && Notification.permission === 'granted') {
            const notificationText = notification.type === 'like' ?
              `${notification.sender.name} ha dado like a tu publicación` :
              notification.message || 'Tienes una nueva notificación';

            new Notification('Nueva notificación', { body: notificationText });
          }
        });

        // Manejar errores de conexión
        socketInstance.on('connect_error', (error) => {
          console.error('Error de conexión al socket:', error);
        });

        // Verificar reconexión
        socketInstance.on('reconnect', () => {
          socketInstance.emit('join', userId);
        });

      } catch (error) {
        console.error('Error al inicializar socket:', error);
      }
    };

    initSocket();

    // Limpiar socket al desmontar el componente
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };

  }, []);

  const markAsRead = async (id) => {
    try {
      await axios.put(`/api/notifications/${id}`);

      setNotifications(prevNotifications =>
        prevNotifications.map(notif =>
          notif._id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error('Error al marcar notificación como leída:', error);
    }
  };

  // Función para obtener el enlace basado en el tipo de notificación
  const getNotificationLink = (notification) => {
    if (notification.type === 'follow') {
      return `/client/userprofile/${notification.sender._id}`;
    } else if (notification.type === 'like' && notification.reference) {
      return `/client/publication/${notification.reference}`;
    } else {
      return `/client/userprofile/${notification.sender._id}`;
    }
  };

  // Función para renderizar el mensaje adecuado según el tipo
  const renderNotificationMessage = (notification) => {
    switch (notification.type) {
      case 'follow':
        return (
          <p className="text-sm font-semibold">
            {notification.sender.name} {notification.sender.apellido} te ha seguido.
          </p>
        );
      case 'like':
        return (
          <p className="text-sm font-semibold">
            {notification.sender.name} {notification.sender.apellido} ha dado like a tu publicación.
          </p>
        );
      default:
        return (
          <p className="text-sm font-semibold">
            {notification.message}
          </p>
        );
    }
  };

  // Función para renderizar el icono según el tipo de notificación
  const renderNotificationIcon = (notification) => {
    switch (notification.type) {
      case 'follow':
        return (
          <div className="flex items-center justify-center h-12 w-12">
            <Link href={`/client/userprofile/${notification.sender._id}`}>
              <img
                className='object-cover h-12 w-12 rounded-full'
                src={notification.sender.profilePicture}
                alt="Foto de perfil"
              />
            </Link>
          </div>
        );
      case 'like':
        return (
          <div className="flex items-center justify-center h-12 w-12 bg-red-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-12 w-12 bg-blue-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        );
    }
  };

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
            <div
              key={notification._id}
              className={`bg-gray-100 p-3 rounded shadow flex justify-between items-center ${!notification.read ? 'border-l-4 border-blue-500' : ''}`}
              onClick={() => markAsRead(notification._id)}
            >
              <div className="flex-grow">
                <p className="text-xs text-gray-500 pb-2">{new Date(notification.createdAt).toLocaleString()}</p>
                <Link href={getNotificationLink(notification)}>
                  {renderNotificationMessage(notification)}
                </Link>
              </div>
              <div>
                {renderNotificationIcon(notification)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}