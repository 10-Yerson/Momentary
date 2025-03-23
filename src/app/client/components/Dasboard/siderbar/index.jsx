'use client'

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { HiHome } from "react-icons/hi";
import { RiMessage3Fill, RiSearchFill } from "react-icons/ri";
import { MdVideoLibrary } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

import { io } from "socket.io-client";
const socket = io(process.env.NEXT_PUBLIC_BASE_URL);

export default function UserPanel() {

  const pathname = usePathname();
  const isMessagesPage = pathname === "/client/messages";
  const isNotificationsPage = pathname === "/client/notifications";

  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  const playNotificationSound = () => {
    try {
      const sound = new Audio('/sounds/notification.mp3');
      sound.volume = 0.5; 
      const playPromise = sound.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Error reproduciendo el sonido:", error);
        });
      }
    } catch (error) {
      console.error("Error al crear el objeto de audio:", error);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      socket.emit("join", userId);

      // Listener para mensajes nuevos
      socket.on("receiveMessage", (message) => {
        if (!isMessagesPage) {
          setHasNewMessage(true);
          // Reproducir sonido cuando llega un mensaje nuevo
          if (typeof window !== 'undefined') {
            playNotificationSound();
          }
        }
      });

      // Listener para mensajes pendientes
      socket.on("pendingMessages", (message) => {
        if (!isMessagesPage) {
          setHasNewMessage(true);
          // Reproducir sonido cuando hay mensajes pendientes
          if (typeof window !== 'undefined') {
            playNotificationSound();
          }
        }
      });

      // Listener para notificaciones nuevas
      socket.on("newNotification", (notification) => {
        if (!isNotificationsPage) {
          setHasNewNotification(true);

          // Reproducir sonido cuando llega una notificación nueva
          if (typeof window !== 'undefined') {
            playNotificationSound();
          }
        }
      });
    }

    // Resetear el indicador cuando el usuario visita la página correspondiente
    if (isMessagesPage) {
      setHasNewMessage(false);
    }

    if (isNotificationsPage) {
      setHasNewNotification(false);
    }

    return () => {
      socket.off("receiveMessage");
      socket.off("pendingMessages");
      socket.off("newNotification");
    };
  }, [isMessagesPage, isNotificationsPage]);

  const NavItem = ({ href, Icon, label, hasNotification }) => {
    const isActive = pathname === href;

    return (
      <li className="mt-3 p-2 rounded-lg">
        <a
          href={href}
          className={`relative flex flex-col items-center pb-1 transition-all duration-300 ${isActive ? "border-b-2 border-black" : "hover:text-blue-600 dark:hover:text-blue-300"}`}
        >
          <div className="relative">
            <Icon className="h-5 w-5" />
            {hasNotification && !isActive && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
            )}
          </div>
          <span className="text-xs mt-2 tracking-wide">{label}</span>
        </a>
      </li>
    );
  };

  const NavItems = ({ href, Icon, isActive, hasNotification }) => {
    return (
      <li className="p-2 text-black">
        <a
          href={href}
          className={`relative flex flex-col items-center pb-3 ${isActive ? "border-b-2 border-black" : ""
            }`}
        >
          <div className="relative">
            <Icon className="h-5 w-5 text-black" />
            {hasNotification && !isActive && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
            )}
          </div>
        </a>
      </li>
    );
  };

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900 flex-1">
        <nav className="w-full hidden sm:hidden md:flex md:w-40 md:flex-col md:items-center justify-around bg-white dark:bg-gray-800 py-4 fixed bottom-0 md:bottom-auto md:top-0 md:left-0 md:h-screen">

          <ul className="flex md:flex-col md:mt-2 text-black capitalize space-x-4 md:space-x-0">
            <NavItem href="/client" Icon={HiHome} label="Home" />
            <NavItem href="/client/messages" Icon={RiMessage3Fill} label="Mensajes" hasNotification={hasNewMessage} />
            <NavItem href="/client/search" Icon={RiSearchFill} label="Buscar" />
            <NavItem href="/client/videos" Icon={MdVideoLibrary} label="Videos" />
            <NavItem href="/client/notifications" Icon={IoNotifications} label="Notificaciones" hasNotification={hasNewNotification} />
            <NavItem href="/client/profile" Icon={FaUserCircle} label="Perfil" />
          </ul>

          <div className="mt-auto flex items-center space-x-3 p-3 dark:text-blue-500 rounded-full md:flex">
            <BsThreeDots className="h-7 w-7" />
          </div>
        </nav>

        <nav className="w-full flex justify-around dark:bg-gray-800 p-3 fixed bottom-0 sm:block md:hidden z-50 bg-white">
          <ul className="flex justify-around w-full text-gray-700 dark:text-gray-400 capitalize">
            <NavItems href="/client/messages" Icon={RiMessage3Fill} isActive={isMessagesPage} hasNotification={hasNewMessage} />
            <NavItems href="/client/search" Icon={RiSearchFill} isActive={pathname === "/client/search"} />
            <NavItems href="/client" Icon={HiHome} isActive={pathname === "/client"} />
            {/* <NavItems href="/client/videos" Icon={MdVideoLibrary} isActive={pathname === "/client/videos"} /> */}
            <NavItems href="/client/notifications" Icon={IoNotifications} isActive={isNotificationsPage} hasNotification={hasNewNotification} />
            <NavItems href="/client/profile" Icon={FaUserCircle} isActive={pathname === "/client/profile"} />
          </ul>
        </nav>
      </div>
    </>
  );
}