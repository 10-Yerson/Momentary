'use client';

import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios';
import { FaCamera } from 'react-icons/fa';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Seguidores from './Seguidores';
import Seguidos from './Seguidos';
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
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('ID del usuario no encontrado en localStorage');
        }
        const response = await axios.get(`/api/user/${userId}`);
        setdata(response.data);
        console.log('Data ', response.data)
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
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('ID del usuario no encontrado en localStorage');
      }
      const formData = new FormData();
      formData.append('profilePicture', selectedImage);
      const response = await axios.put(`/api/user/profile/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
      setIsLoading(false); // Detiene el estado de carga
    }
  };
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const Modaltoggle = () => {
    setOpen(!OpenIs);
  };


  return (
    <div className="flex flex-row items-center justify-around w-full my-6 md:my-10 space-x-4">
      <div className="relative">
        <div className="rounded-full overflow-hidden w-16 h-16 sm:w-24 sm:h-24 md:w-36 md:h-36">
          <img
            src={data.profilePicture}
            alt="Profile picture"
            className="object-cover w-full h-full"
          />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute bottom-0 right-0 p-1 rounded-full bg-white shadow"
        >
          
          <img
            src="\img\icons\photo-camera.png"
            alt="Icono de cámara"
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-8 md:h-8"
          />
        </button>
      </div>

      <div className="flex flex-col items-start">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <h1 className="text-base sm:text-xl md:text-3xl font-semibold">
            {data.name} {data.apellido}
          </h1>
          <button className="px-3 sm:px-4 py-1 border rounded-md text-xs sm:text-sm md:text-lg">
            Editar perfil
          </button>
          <button className="px-3 sm:px-4 py-1 border rounded-md text-xs sm:text-sm md:text-lg">
            Ver archivo
          </button>
          <i className="fas fa-cog text-md sm:text-lg"></i>
        </div>
        <div className="flex mt-3 text-xs sm:text-sm md:text-lg space-x-4">
          <span><strong>0</strong> publicaciones</span>
          <span onClick={toggleModal} ><strong>{data.followers?.length || 0}</strong> seguidores</span>
          <span onClick={Modaltoggle}><strong>{data.following?.length || 0}</strong> seguidos</span>
        </div>
        <Seguidores isOpen={isOpen} toggleModal={toggleModal} />
        <Seguidos OpenIS={OpenIs} Modaltoggle={Modaltoggle} />
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Upload Profile Picture"
        className="relative bg-white p-8 rounded-lg md:w-[50%] lg:w-[40%] w-[90%] mx-auto shadow-2xl transform transition-all duration-300 ease-out"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center"
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
    </div>

  );
}
