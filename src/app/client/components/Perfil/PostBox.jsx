'use client';

import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios';
import Createpublication from '../Modal/Createpublication';
import Link from 'next/link';
import { BsPersonLinesFill, BsHouseDoorFill, BsHeartFill } from "react-icons/bs";

export default function PostBox() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(''); // Estado inicial null para diferenciar cuando no hay datos

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfoResponse = await axios.get('/api/auth/user-info');
        const userId = userInfoResponse.data.userId;

        if (!userId) {
          throw new Error('ID del usuario no encontrado en la respuesta del servidor');
        }

        const response = await axios.get(`/api/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full justify-between rounded-md mt-3 space-y-5 mb-7">
      <div className="w-full md:w-2/5 rounded bg-white">
        <div className=" rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Detalles</h2>
          {user?.profile?.descripcion ? (
            <div className="flex items-center mb-2">
              <BsPersonLinesFill className="text-gray-600 text-2xl mr-2 flex-shrink-0" />
              <span className="break-words">{user.profile.descripcion}</span>
            </div>
          ) : (
            <Link href="/client/edit/profile">
              <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-md mb-4">
                Añadir presentación
              </button>
            </Link>
          )}

          {user?.profile?.origen && (
            <div className="flex items-center mb-4">
              <BsHouseDoorFill className="text-gray-600 text-2xl mr-2" />
              <span>
                De <span className="font-semibold">{user.profile.origen}</span>
              </span>
            </div>
          )}

          {user?.profile?.estadoCivil && (
            <div className="flex items-center mb-4">
              <BsHeartFill className="text-gray-600 text-2xl mr-2" />
              <span>{user.profile.estadoCivil}</span>
            </div>
          )}

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

      <div className="w-full rounded-lg md:w-1/2 grid place-items-center px-2">
        <div className="w-full bg-slate-200 flex flex-col md:flex-row rounded-xl">

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
                {user.name}<i className="fa-solid fa-chevron-right"></i>
              </h4>
            </div>
          </div>

          <div className="p-7 bg-white w-full md:w-[50%] rounded-b-xl md:rounded-r-xl relative">
            <h1 className="text-[18px] md:text-[28px] pt-2 font-[500] tracking-wide" onClick={() => setModalOpen(true)}>
              ¿Qué estás pensando?
            </h1>
            <input
              onClick={() => setModalOpen(true)}
              type="button"
              readOnly
              value="Crear publicación"
              className="hidden md:block px-3 py-2 bg-blue-600 text-white rounded-md tracking-wide cursor-pointer absolute right-12 bottom-7"
            />
          </div>
        </div>
      </div>
      <Createpublication isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
