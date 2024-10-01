'use client';

import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios';
import { FaCamera } from 'react-icons/fa';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
Modal.setAppElement('body');

export default function ProfileInfo() {

  const [userName, setUserName] = useState('');
  const [lastname, setLastname] = useState('');
  const [profilePicture, setProfilePicture] = useState('')
  const [selectedImage, setSelectedImage] = useState(null); // Nueva imagen seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setdata] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
          throw new Error('ID del usuario no encontrado en sessionStorage');
        }
        const response = await axios.get(`/api/user/${userId}`);
        setdata(response.data);
        setUserName(response.data.name);
        setLastname(response.data.apellido);
        setProfilePicture(response.data.profilePicture);
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
    try {
      const userId = sessionStorage.getItem('userId');
      if (!userId) {
        throw new Error('ID del usuario no encontrado en sessionStorage');
      }

      const formData = new FormData();
      formData.append('profilePicture', selectedImage);

      const response = await axios.put(`/api/user/profile/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProfilePicture(response.data.profilePicture);
      toast.success('Imagen de perfil actualizada exitosamente');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating profile picture:', error);
      toast.error('Error actualizando la imagen de perfil');
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <img
          alt="Profile picture"
          className="h-24 w-24 rounded-full border-4 border-white object-cover"
          src={profilePicture}
        />
        <button onClick={() => setIsModalOpen(true)}
          className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow">
          <FaCamera size={23} color="black" />
        </button>
      </div>
      <div>
        <p className="text-gray-800 text-2xl">
          {userName} <span className="text-gray-600">{lastname}</span>
        </p>

        <div className="flex space-x-2 mt-2">
          <button className="bg-neutral-950 text-white border border-neutral-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md">
            Añadir a historia
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded">Editar perfil</button>
          <button className="bg-gray-200 px-4 py-2 rounded">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Upload Profile Picture"
        className="relative bg-white p-8 rounded-lg max-w-lg mx-auto mt-32 shadow-2xl transform transition-all duration-300 ease-out"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center"
      >
        {/* Botón de cerrar en forma de "X" */}
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

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSaveImage}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-150"
          >
            Guardar
          </button>
        </div>
      </Modal>
    </div>
  );
}
