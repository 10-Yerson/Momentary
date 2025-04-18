'use client';

import { useState, useEffect } from 'react';
import axios from '../../../../../utils/axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BsPersonLinesFill, BsHouseDoorFill, BsHeartFill } from "react-icons/bs";

export default function ProfileBio() {

  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/user/${id}`);
        setData(response.data);
      } catch (error) {
        console.error('Error al obtener notificaciones:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-4 w-[85%] md:w-4/5 lg:w-1/2 md:mx-0 mx-auto rounded-md">
      <h2 className="text-lg font-semibold mb-4">Detalles</h2>

      {data?.profile?.descripcion || data?.profile?.origen || data?.profile?.estadoCivil ? (
        <>
          {data?.profile?.descripcion && (
            <div className="flex items-center mb-2">
              <BsPersonLinesFill className="text-gray-600 text-2xl mr-2 flex-shrink-0" />
              <span className="break-words">{data.profile.descripcion}</span>
            </div>
          )}
          {data?.profile?.origen && (
            <div className="flex items-center mb-4">
              <BsHouseDoorFill className="text-gray-600 text-2xl mr-2" />
              <span>
                De <span className="font-semibold">{data.profile.origen}</span>
              </span>
            </div>
          )}
          {data?.profile?.estadoCivil && (
            <div className="flex items-center mb-4">
              <BsHeartFill className="text-gray-600 text-2xl mr-2" />
              <span>{data.profile.estadoCivil}</span>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center w-full bg-white rounded-md" >
          <section className="flex justify-center items-center w-16 h-16 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full shadow-md overflow-hidden">
            <img
              src={data.profilePicture}
              alt="Foto de perfil"
              className="w-full h-full object-cover rounded-full"
            />
          </section>

          <section className="block border-l border-gray-300 m-3">
            <div className="pl-3">
              <h3 className="text-gray-600 font-semibold text-sm">{data.name} {data.apellido}</h3>
              <h3 className="text-gray-700 text-lg font-bold">
                No hay información disponible
              </h3>
            </div>
          </section>
        </div>

      )}
    </div>


  )
}

