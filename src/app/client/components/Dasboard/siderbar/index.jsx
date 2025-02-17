
'use client'

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function UserPanel() {

  const NavItem = ({ href, iconPath, label }) => (
    <li className="mt-3 p-2 hover:text-blue-600 dark-hover:text-blue-300 rounded-lg">
      <a href={href} className="flex flex-col items-center">
        <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
          <path d={iconPath}></path>
        </svg>
        <span className="text-xs mt-2">{label}</span>
      </a>
    </li>
  );

  const NavItems = ({ href, icon, label }) => (
    <li className="p-2 text-blue-600 dark:text-blue-300">
      <a href={href} className="flex flex-col items-center">
        {icon}
        <span className="text-xs">{label}</span>
      </a>
    </li>
  );
  return (
    <>
      <ToastContainer />
      <div className="bg-gray-100 dark:bg-gray-900 flex-1">
        <nav className="w-full md:w-40 flex md:flex-col md:items-center justify-around bg-white dark:bg-gray-800 py-4 fixed bottom-0 md:bottom-auto md:top-0 md:left-0 md:h-screen">
          <div>
            <svg className="h-8 w-8 fill-current text-blue-600 dark:text-blue-300 hidden md:block" viewBox="0 0 24 24">
              <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3m6.82 6L12 12.72 5.18 9 12 5.28 18.82 9M17 16l-5 2.72L7 16v-3.73L12 15l5-2.73V16z"></path>
            </svg>
          </div>

          <ul className="flex md:flex-col md:mt-2 text-gray-700 dark:text-gray-400 capitalize space-x-4 md:space-x-0">
            <NavItem href="/client" iconPath="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3M11 3H3v10h8V3m10 8h-8v10h8V11m-10 4H3v6h8v-6z" label="dashboard" />
            <NavItem href="/client/messages" iconPath="M23 3v-.5a2.5 2.5 0 00-5 0V3c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h5c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1m-1 0h-3v-.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V3M6 11h9v2H6v-2m0-4h9v2H6V7m16 4v5c0 1.11-.89 2-2 2H6l-4 4V4a2 2 0 012-2h11v2H4v13.17L5.17 16H20v-5h2z" label="Mensajes" />
            <NavItem href="/client/search" iconPath="M15.5 14h-.79l-.28-.27a6.5 6.5 0 10-1.41 1.41l.27.28v.79l5 5L20.5 19l-5-5zM10 15a5 5 0 110-10 5 5 0 010 10z" label="buscar" />
            <NavItem href="/client/videos" iconPath="M17 10.5V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3.5l4 3V7.5l-4 3z" label="Videos" />
            <NavItem href="/client/notifications" iconPath="M12 2a7 7 0 00-7 7v5a3 3 0 01-2 2.83V18h18v-1.17a3 3 0 01-2-2.83V9a7 7 0 00-7-7zm0 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" label="notificaciones" />
            <NavItem href="/client/profile" iconPath="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z" label="perfil" />
          </ul>

          <div className="mt-auto items-center justify-end p-2 text-blue-700 bg-purple-200 dark:text-blue-500 rounded-full hidden md:block">
            <a href="/">
              <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                <path d="M12 1c-5 0-9 4-9 9v7a3 3 0 003 3h3v-8H5v-2a7 7 0 017-7 7 7 0 017 7v2h-4v8h4v1h-7v2h6a3 3 0 003-3V10c0-5-4.03-9-9-9z"></path>
              </svg>
            </a>
          </div>
        </nav>


        <nav className="w-full flex justify-around bg-white dark:bg-gray-800 py-2 fixed bottom-0 sm:block md:hidden">
          <ul className="flex justify-around w-full text-gray-700 dark:text-gray-400 capitalize">
            <NavItems
              href="/client/messages"
              icon={
                <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                  <path d="M23 3v-.5a2.5 2.5 0 00-5 0V3c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h5c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1m-1 0h-3v-.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V3M6 11h9v2H6v-2m0-4h9v2H6V7m16 4v5c0 1.11-.89 2-2 2H6l-4 4V4a2 2 0 012-2h11v2H4v13.17L5.17 16H20v-5h2z" />
                </svg>
              }
              label="ㅤ"
            />
            <NavItems
              href="/client/search"
              icon={
                <svg className="fill-current h-5 w-5" viewBox="0 0 512 512">
                  <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                </svg>
              }
              label="ㅤ"
            />
            <NavItems
              href="/client"
              icon={
                <svg className="fill-current h-6 w-6" viewBox="0 0 24 24">
                  <path d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3M11 3H3v10h8V3m10 8h-8v10h8V11m-10 4H3v6h8v-6z" />
                </svg>
              }
              label="ㅤ"
            />
            <NavItems
              href="/client/notifications"
              icon={
                <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                  <path d="M12 2a7 7 0 00-7 7v5a3 3 0 01-2 2.83V18h18v-1.17a3 3 0 01-2-2.83V9a7 7 0 00-7-7zm0 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              }
              label="ㅤ"
            />
            <NavItems
              href="/client/profile"
              icon={
                <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                  <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z" />
                </svg>
              }
              label="ㅤ"
            />
          </ul>
        </nav>
      </div>
    </>
  );
}
