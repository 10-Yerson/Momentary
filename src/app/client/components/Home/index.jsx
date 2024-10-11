'use client'

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../../../utils/axios'
import ModalProfile from "../Modal/ModalProfile";
import Link from 'next/link';

export default function Welcome() {

  const [isModalOpen, setModalOpen] = useState(false);

  const [data, setdata] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('ID del usuario no encontrado en localStorage');
        }
        const response = await axios.get(`/api/user/${userId}`);
        setdata(response.data);
        console.log('Datos Usuario', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error cargando datos del usuario');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex overflow-hidden select-none md:ml-40 ml-0 flex-1 flex-col">
        <main className="flex pt-2 pb-2 flex-1 justify-between dark:bg-black rounded-l-lg transition duration-500 ease-in-out overflow-hidden">
          <div className="flex flex-col capitalize text-2xl md:text-3xl px-3">
            <span className="font-semibold py-3 text-1xl md:text-3xl">hello,</span>
            <p className="font-semibold text-gray-800 text-xl md:text-2xl">
              {data.name} <span className="text-gray-600">{data.apellido}</span>
            </p>
          </div>
          <aside className="px-4 md:px-6 py-4 flex flex-col dark:bg-black dark:text-gray-100 rounded-r-lg overflow-hidden">
            <div className="flex items-center justify-end gap-x-6 md:gap-x-9">
              <a href="#" className="relative">
                <span>
                  <svg
                    className="h-6 w-6 md:h-8 md:w-8 hover:text-red-600 dark:hover:text-red-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </span>
                <div className="absolute w-4 h-4 md:w-5 md:h-5 left-0 mb-4 md:mb-6 ml-1 md:ml-2 bottom-0">
                  <span className="px-1 py-0.5 md:px-2 md:py-1 bg-red-600 rounded-full text-white text-xs">
                    7
                  </span>
                </div>
              </a>
              <div className="flex items-center gap-2 md:gap-3">
                <Link href="/client/profile">
                  <img
                    className="h-10 w-10 md:h-14 md:w-14 rounded-full object-cover cursor-pointer"
                    src={data.profilePicture || 'https://metro.co.uk/wp-content/uploads/2018/09/sei_30244558-285d.jpg?quality=90&strip=all'}
                    alt="tempest profile"
                  />
                </Link>
                <button
                  onClick={() => setModalOpen(true)}
                  className="ml-1 focus:outline-none"
                >
                  <svg className="h-4 w-4 md:h-6 md:w-6 fill-current" viewBox="0 0 192 512">
                    <path
                      d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"
                    ></path>
                  </svg>
                </button>
              </div>
              <ModalProfile isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
            </div>
          </aside>
        </main>

        <div className="flex">
          <div className="w-full mt-8 flex-shrink-0 flex flex-col	dark:bg-gray-600 rounded-lg bg-white px-3">
            Publicaciones
          </div>
        </div>

      </div>
    </>
  );
}
