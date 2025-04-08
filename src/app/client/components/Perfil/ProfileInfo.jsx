'use client';

import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios';
import { MdVerified } from "react-icons/md";
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Seguidores from './Seguidores';
import Seguidos from './Seguidos';
import { Camera, MoreHorizontal, Pencil } from "lucide-react";
import Link from 'next/link';
Modal.setAppElement('body');

export default function ProfileInfo() {
  const [selectedImage, setSelectedImage] = useState(null); // Nueva imagen seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setdata] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [OpenIs, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfoResponse = await axios.get('/api/auth/user-info');
        const userId = userInfoResponse.data.userId;

        if (!userId) {
          throw new Error('ID del usuario no encontrado en la respuesta del servidor');
        }
        const response = await axios.get(`/api/user/${userId}`, { withCredentials: true });
        setdata(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error cargando datos del usuario');
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = async () => {
    setIsLoading(true);
    try {
      const userInfoResponse = await axios.get('/api/auth/user-info', { withCredentials: true });
      const userId = userInfoResponse.data.userId;

      if (!userId) {
        throw new Error('ID del usuario no encontrado en la respuesta del servidor');
      }

      const formData = new FormData();
      formData.append('profilePicture', selectedImage);

      const response = await axios.put(`/api/user/profile/${userId}`, formData, {
        withCredentials: true // Asegura que las cookies se envíen
      });

      // Actualizamos el estado 'data' con la nueva imagen de perfil
      setdata(prevData => ({
        ...prevData,
        profilePicture: response.data.profilePicture,
      }));

      toast.success('Imagen de perfil actualizada exitosamente');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating profile picture:', error);
      toast.error('Error actualizando la imagen de perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const Modaltoggle = () => {
    setOpen(!OpenIs);
  };


  return (
    <>
      <div className="w-full bg-white flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0 md:space-x-5 px-2">
        <div className="w-full md:w-1/2 px-2">
          <div className="pt-4 pb-4">
            <div className="flex items-end gap-4 mb-4">
              <div className="relative flex justify-center">
                <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gray-200 border-4 border-white relative overflow-hidden">
                  <img
                    src={data.profilePicture || 'https://res.cloudinary.com/dbgj8dqup/image/upload/v1743182322/uploads/ixv6tw8jfbhykflcmyex.png'}
                    alt="Profile picture"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 z-10"
                >
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                </button>
              </div>

              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 flex items-center gap-2">
                  {data.name} {data.apellido}
                  {data.isVerified === true && (
                    <MdVerified
                      className="text-blue-500 ml-1"
                      title="Cuenta verificada"
                    />
                  )}
                </h1>
                <div className="text-base sm:text-lg text-gray-500 mb-3 flex items-center">
                  <span
                    onClick={toggleModal}
                    className="cursor-pointer"
                  >
                    {data.followers?.length || 0} seguidores
                  </span>
                  <span className="mx-2">·</span>
                  <span
                    onClick={Modaltoggle}
                    className="cursor-pointer"
                  >
                    {data.following?.length || 0} siguiendo
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="flex items-center w-full md:w-1/2 gap-2">
          <button className="bg-[#0866FF] text-white px-3 py-2 rounded-md font-semibold flex items-center gap-2 flex-grow justify-center">
            <span className="text-xl">+</span> Añadir a historia
          </button>
          <Link href="/client/edit/provide" className="flex-grow">
            <button className="bg-gray-200 px-3 py-2 rounded-md font-semibold flex items-center gap-2 w-full justify-center">
              <Pencil className="w-4 h-4" /> Editar perfil
            </button>
          </Link>
          <button className="p-2 hover:bg-gray-100 rounded-md flex-shrink-0 w-10 flex justify-center">
            <MoreHorizontal className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="border-t-2 border-gray-300 my-4 rounded-full sm:my-5"></div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Upload Profile Picture"
        className="relative bg-white p-8 rounded-lg md:w-[50%] lg:w-[40%] w-[90%] mx-auto shadow-2xl transform transition-all duration-300 ease-out z-50"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50"
      >
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          x
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Subir nueva imagen de perfil</h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {/* Mostrar la vista previa solo si se ha seleccionado una imagen */}
        {selectedImage && (
          <div className="flex justify-center">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="h-48 w-48 rounded-full object-cover mb-4 border border-gray-200 shadow-lg"
            />
          </div>
        )}

        {isLoading ? (
          <div className="text-center text-blue-600 mb-4">Cargando...</div> // Mostrar indicador de carga
        ) : (
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleSaveImage}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-150"
            >
              Guardar
            </button>
          </div>
        )}
      </Modal>
      <Seguidores isOpen={isOpen} toggleModal={toggleModal} />
      <Seguidos OpenIS={OpenIs} Modaltoggle={Modaltoggle} />
    </>
  );
}
