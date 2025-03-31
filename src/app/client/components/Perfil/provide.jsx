'use client';

import React, { useState, useEffect } from 'react';
import { FaUser, FaHeart, FaEdit, FaRunning, FaGlobe, FaFacebook, FaInstagram } from 'react-icons/fa';
import axios from '../../../../utils/axios';

export default function UpdateProfile() {
  const [userData, setUserData] = useState({
    estadoCivil: '',
    descripcion: '',
    hobbies: [],
    socialLinks: { facebook: '', instagram: '' },
    origen: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userInfoResponse = await axios.get('/api/auth/user-info');
        const userId = userInfoResponse.data.userId;

        if (!userId) {
            throw new Error('ID del usuario no encontrado en la respuesta del servidor');
        }
        const response = await axios.get(`/api/user/${userId}`);
        setUserData(response.data.profile);
      } catch (error) {
        console.error('Error obteniendo usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    setSaving(true);
    setMessage('');

    const userInfoResponse = await axios.get('/api/auth/user-info');
    const userId = userInfoResponse.data.userId;

    if (!userId) {
      throw new Error('ID del usuario no encontrado en la respuesta del servidor');
    }

    try {
      const response = await axios.put(`/api/user/${userId}`, userData);
      setMessage('Usuario actualizado correctamente.');
      setUserData(response.data);
    } catch (error) {
      setMessage('Error al actualizar usuario.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-600 text-center">Cargando datos del usuario...</p>;

  return (
    <div className="p-6 flex justify-center w-full mb-24 lg:mb-0">
      <div className="w-full bg-white">
        {/* <h2 className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-2 mb-6">
          <FaUser className="text-blue-500" /> Actualizar Perfil
        </h2> */}

        {/* Contenedor de los campos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Estado Civil */}
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg shadow">
            <FaHeart className="text-red-500 text-xl" />
            <div className="w-full">
              <label className="block text-sm font-semibold text-gray-600">Estado Civil</label>
              <select
                name="estadoCivil"
                value={userData.estadoCivil}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mt-1 bg-white"
              >
                <option value="">Selecciona tu estado civil</option>
                <option value="Soltero">Soltero</option>
                <option value="Casado">Casado</option>
                <option value="Divorciado">Divorciado</option>
                <option value="Viudo">Viudo</option>
              </select>
            </div>
          </div>

          {/* Origen */}
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg shadow">
            <FaGlobe className="text-gray-500 text-xl" />
            <div className="w-full">
              <label className="block text-sm font-semibold text-gray-600">Origen</label>
              <input
                type="text"
                name="origen"
                value={userData.origen}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mt-1 bg-white"
                placeholder="País o ciudad de origen"
              />
            </div>
          </div>

          {/* Descripción (Ocupa una fila completa) */}
          <div className="col-span-1 md:col-span-2 flex items-start gap-3 bg-gray-50 p-4 rounded-lg shadow">
            <FaEdit className="text-gray-500 text-xl mt-1" />
            <div className="w-full">
              <label className="block text-sm font-semibold text-gray-600">Descripción</label>
              <textarea
                name="descripcion"
                value={userData.descripcion}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mt-1 bg-white"
                placeholder="Escribe algo sobre ti..."
              />
            </div>
          </div>

          {/* Hobbies */}
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg shadow">
            <FaRunning className="text-green-500 text-xl" />
            <div className="w-full">
              <label className="block text-sm font-semibold text-gray-600">Hobbies</label>
              <input
                type="text"
                name="hobbies"
                value={Array.isArray(userData.hobbies) ? userData.hobbies.join(', ') : ''}
                onChange={(e) => setUserData({ ...userData, hobbies: e.target.value.split(', ') })}
                className="w-full p-2 border rounded-lg mt-1 bg-white"
                placeholder="Ej. Programar, Leer, Correr"
              />
            </div>
          </div>

          {/* Redes Sociales */}
          <div className="col-span-1 md:col-span-2 bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-3">
              <FaGlobe className="text-blue-500" /> Redes Sociales
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <FaFacebook className="text-blue-600 text-xl" />
                <input
                  type="text"
                  name="facebook"
                  value={userData.socialLinks?.facebook || ''}
                  onChange={(e) => setUserData({ ...userData, socialLinks: { ...userData.socialLinks, facebook: e.target.value } })}
                  className="w-full p-2 border rounded-lg bg-white"
                  placeholder="Facebook"
                />
              </div>
              <div className="flex items-center gap-3">
                <FaInstagram className="text-pink-500 text-xl" />
                <input
                  type="text"
                  name="instagram"
                  value={userData.socialLinks?.instagram || ''}
                  onChange={(e) => setUserData({ ...userData, socialLinks: { ...userData.socialLinks, instagram: e.target.value } })}
                  className="w-full p-2 border rounded-lg bg-white"
                  placeholder="Instagram"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Botón de guardar */}
        <div className="text-center mt-6">
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleUpdate}
            disabled={saving}
          >
            {saving ? 'Guardando...' : 'Actualizar Datos'}
          </button>
        </div>

        {/* Mensaje */}
        {message && <p className="mt-4 text-sm text-center text-gray-700">{message}</p>}
      </div>
    </div>
  );
}
