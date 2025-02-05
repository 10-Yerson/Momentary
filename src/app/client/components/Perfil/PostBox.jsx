'use client';

import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios';
import Createpublication from '../Modal/Createpublication';
import Link from 'next/link';
import { FaSave, FaPlus, FaCity, FaHeart, FaLink, FaAlignLeft, FaInfoCircle, FaVideo, FaPhotoVideo, FaFilter, FaTh, FaList, FaCog } from 'react-icons/fa';

export default function PostBox() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(''); // Estado inicial null para diferenciar cuando no hay datos

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('ID del usuario no encontrado en localStorage');
        }
        const response = await axios.get(`/api/user/${userId}`);
        setUser(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full justify-between rounded-md mt-3 space-y-5">
      <div className="w-full md:w-2/5 rounded bg-white">
        <div className=" rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Detalles</h2>
          <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-md mb-4">Añadir presentación</button>

          <div className="flex items-center mb-2">
            <FaInfoCircle className="text-gray-600 text-2xl mr-2" />
            <span>Hola Soy Desarrollador de Software</span>
          </div>

          <div className="flex items-center mb-2">
            <FaCity className="text-gray-600 text-2xl mr-2" />
            <span>De <span className="font-semibold" >Popayán</span></span>
          </div>
          <div className="flex items-center mb-4">
            <FaHeart className="text-gray-600 text-2xl mr-2" />
            <span>Soltero</span>
          </div>
          <Link href="/client/edit/profile" >
            <button className="w-full bg-gray-100 text-gray-700 py-2 rounded mb-4">Añadir detalles</button>
          </Link>
          <Link href="/client/adiction" className="flex space-x-4">
            <img className="object-cover w-5 h-5" src="/img/icons/more.png" alt="Más información" />
            <p className="text-blue-600 font-semibold hover:underline cursor-pointer">Ver más sobre ti</p>
          </Link>
        </div>
      </div>

      {/* <div className="w-full rounded-lg md:w-1/2 grid place-items-center">

        <div class="h-[220px] w-[700px] bg-slate-200 flex rounded-xl">
          <div
            className="relative h-full w-[250px] p-7 text-white rounded-l-xl bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50 before:rounded-l-xl"
            style={{ backgroundImage: `url(${user.profilePicture})` }}
          >
            <div className="relative z-10">
              <p className="text-[11px] tracking-widest text-[#cccccc]">PUBLICACIÓN</p>
              <h1 className="text-[25px] pt-5 font-medium tracking-wide leading-[25px]">
                Comparte tus pensamientos
              </h1>
              <h4 className="text-[12px] pt-[50px] text-[#cccccc] cursor-pointer">
                Ver todas las publicaciones <i className="fa-solid fa-chevron-right"></i>
              </h4>
            </div>
          </div>

          <div class="p-7 bg-white w-full rounded-r-xl relative">
            <h1 class="text-[28px] pt-2 font-[500] tracking-wide" onClick={() => setModalOpen(true)}>
              ¿Qué estás pensando?
            </h1>
            <input
              onClick={() => setModalOpen(true)}
              type="button" readOnly
              value="Crear publicación"
              class=" px-3 py-2 bg-blue-600 text-white rounded-md tracking-wide absolute right-12 bottom-7 cursor-pointer"
            />

          </div>
        </div>
      </div> */}

      <div className="w-full rounded-lg md:w-1/2 grid place-items-center">
        <div className="h-[220px] w-full md:w-[700px] bg-slate-200 flex flex-col md:flex-row rounded-xl">

          <div
            className="relative h-[120px] md:h-full w-full md:w-[50%] p-7 text-white rounded-t-xl md:rounded-l-xl bg-center bg-cover before:absolute before:inset-0 before:bg-black before:opacity-50 before:rounded-l-xl"
            style={{ backgroundImage: `url(${user.profilePicture})` }}
          >
            <div className="relative z-10">
              <p className="text-[11px] tracking-widest text-[#cccccc]">PUBLICACIÓN</p>
              <h1 className="text-[18px] md:text-[25px] pt-5 font-medium tracking-wide leading-[25px]">
                Comparte tus pensamientos
              </h1>
              <h4 className="text-[12px] pt-[50px] text-[#cccccc] cursor-pointer">
                Ver todas las publicaciones <i className="fa-solid fa-chevron-right"></i>
              </h4>
            </div>
          </div>

          <div className="p-7 bg-white w-full md:w-[50%] rounded-b-xl md:rounded-r-xl relative">
            <h1 className="text-[18px] md:text-[28px] pt-2 font-[500] tracking-wide" onClick={() => setModalOpen(true)}>
              ¿Qué estás pensando?
            </h1>
            <input
              onClick={() => setModalOpen(true)}
              type="button" readOnly
              value="Crear publicación"
              className="px-3 py-2 bg-blue-600 text-white rounded-md tracking-wide absolute right-12 bottom-7 cursor-pointer"
            />
          </div>
        </div>
      </div> 
      <Createpublication isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
