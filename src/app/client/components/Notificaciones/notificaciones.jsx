'use client';

import React, { useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import Link from 'next/link';
import io from 'socket.io-client';

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  // URL del servidor Socket.io
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
            const notificationText = getNotificationText(notification);
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
    switch (notification.type) {
      case 'follow':
        return `/client/userprofile/${notification.sender._id}`;
      case 'like':
        if (notification.referenceModel === 'Comment') {
          return `/client/publication/${notification.reference}`; // Esto debería llevar a la publicación que contiene el comentario
        } else {
          return `/client/publication/${notification.reference}`;
        }
      case 'comment':
        if (notification.referenceModel === 'Comment') {
          return `/client/publication/${notification.reference}`; // Esto debería llevar a la publicación que contiene el comentario
        } else {
          return `/client/publication/${notification.reference}`;
        }
      default:
        return `/client/userprofile/${notification.sender._id}`;
    }
  };

  // Función para obtener el texto de la notificación
  const getNotificationText = (notification) => {
    if (!notification.sender) return notification.message || 'Nueva notificación';
    
    const senderName = `${notification.sender.name} ${notification.sender.apellido || ''}`.trim();
    
    switch (notification.type) {
      case 'follow':
        return `${senderName} te ha seguido.`;
      case 'like':
        if (notification.referenceModel === 'Comment') {
          return `A ${senderName} le ha gustado tu comentario.`;
        } else {
          return `A ${senderName} le ha gustado tu publicación.`;
        }
      case 'comment':
        if (notification.referenceModel === 'Comment') {
          return `${senderName} ha respondido a tu comentario.`;
        } else {
          return `${senderName} ha comentado tu publicación.`;
        }
      default:
        return notification.message || 'Tienes una nueva notificación';
    }
  };

  // Función para renderizar el icono según el tipo de notificación
  const getNotificationBadge = (type) => {
    switch (type) {
      case 'follow':
        return (
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-1 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </span>
        );
      case 'like':
        return (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </span>
        );
      case 'comment':
        return (
          <span className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </span>
        );
      default:
        return (
          <span className="absolute -top-1 -right-1 bg-gray-400 text-white rounded-full p-1 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </span>
        );
    }
  };

  // Función para obtener el color de la etiqueta según el tipo
  const getTagColor = (type) => {
    switch (type) {
      case 'follow':
        return 'bg-blue-100 text-blue-800';
      case 'like':
        return 'bg-red-100 text-red-800';
      case 'comment':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Función para obtener el color del borde izquierdo según el tipo (para notificaciones no leídas)
  const getBorderColor = (type) => {
    switch (type) {
      case 'follow':
        return 'border-l-blue-500';
      case 'like':
        return 'border-l-red-500';
      case 'comment':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-400';
    }
  };

  return (
    <div className="w-full md:w-1/2 mx-auto p-4">
      <h2 className="text-xl font-bold mb-6 border-b pb-2">Notificaciones</h2>
      
      <div className="space-y-3">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p>No tienes notificaciones.</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <Link 
              href={getNotificationLink(notification)}
              key={notification._id}
              onClick={() => !notification.read && markAsRead(notification._id)}
            >
              <div className={`bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200 border ${!notification.read ? `border-l-4 ${getBorderColor(notification.type)}` : 'border-gray-200'}`}>
                <div className="flex items-start space-x-3">
                  {/* Foto de perfil con indicador del tipo */}
                  <div className="relative">
                    <img
                      className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
                      src={notification.sender?.profilePicture || "https://via.placeholder.com/48"}
                      alt={`${notification.sender?.name || 'Usuario'}`}
                    />
                    {getNotificationBadge(notification.type)}
                  </div>
                  
                  {/* Contenido de notificación */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{getNotificationText(notification)}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.createdAt).toLocaleString('es-ES', { 
                            day: 'numeric', 
                            month: 'short', 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                      
                      {/* Indicador de no leído */}
                      {!notification.read && (
                        <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                    
                    {/* Etiqueta de tipo */}
                    <div className="mt-2">
                      <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${getTagColor(notification.type)}`}>
                        {notification.type === 'follow' ? 'Seguimiento' :
                         notification.type === 'like' ? 'Me gusta' :
                         notification.type === 'comment' ? 'Comentario' :
                         'Notificación'}
                      </span>
                      
                      {/* Opcional: información de referencia */}
                      {notification.referenceModel && (
                        <span className="text-xs text-gray-500 ml-2">
                          {notification.referenceModel === 'Comment' ? 'en comentario' : 'en publicación'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}