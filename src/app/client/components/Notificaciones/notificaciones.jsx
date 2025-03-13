'use client';

import React, { useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import Link from 'next/link';
import io from 'socket.io-client';

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  // URL del servidor Socket.io - ajusta según tu configuración
  const SOCKET_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    // Cargar notificaciones iniciales
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
        // Obtener el ID del usuario directamente desde localStorage
        const userId = localStorage.getItem("userId");

        if (!userId) {
          console.error('No se encontró el ID del usuario en localStorage');
          return;
        }

        // Conectar al servidor socket
        const socketInstance = io(SOCKET_URL);
        setSocket(socketInstance);

        // Registrar al usuario en el sistema de socket
        socketInstance.emit('join', userId);
        console.log('Usuario conectado al socket:', userId);

        // Escuchar nuevas notificaciones
        socketInstance.on('newNotification', (notification) => {
          console.log('Nueva notificación recibida:', notification);

          // Verificar si la notificación ya existe para evitar duplicados
          setNotifications(prevNotifications => {
            // Comprobar si ya existe esta notificación por ID
            const exists = prevNotifications.some(
              notif => notif._id === notification._id
            );

            // Si no existe, añadirla al principio de la lista
            if (!exists) {
              return [notification, ...prevNotifications];
            }

            // Si ya existe, no modificar el estado
            return prevNotifications;
          });

          // Opcional: Mostrar notificación del sistema
          if (Notification && Notification.permission === 'granted') {
            new Notification('Nueva notificación', {
              body: notification.message || 'Alguien te ha seguido'
            });
          }
        });

        // Manejar errores de conexión
        socketInstance.on('connect_error', (error) => {
          console.error('Error de conexión al socket:', error);
        });
      } catch (error) {
        console.error('Error al inicializar socket:', error);
      }
    };

    initSocket();

    // Limpiar socket al desmontar el componente
    return () => {
      if (socket) {
        console.log('Desconectando socket');
        socket.disconnect();
      }
    };
  }, []);

  // Función para marcar una notificación como leída
  const markAsRead = async (id) => {
    try {
      await axios.put(`/api/notifications/${id}`);

      // Actualizar estado local
      setNotifications(prevNotifications =>
        prevNotifications.map(notif =>
          notif._id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error('Error al marcar notificación como leída:', error);
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