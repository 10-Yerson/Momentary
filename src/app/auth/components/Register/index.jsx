'use client';

import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Asegúrate de importar 'toast'
import 'react-toastify/dist/ReactToastify.css';
import './main.css';
import { useRouter } from 'next/navigation';
const URL_API = process.env.NEXT_PUBLIC_BASE_URL

export default function Register() {
    const [name, setName] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false); // Nuevo estado para el checkbox
  const router = useRouter();

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const validateForm = () => {
    if (!name || !apellido || !fechaNacimiento || !genero || !email || !password || !confirmPassword) {
      toast.error('Por favor, completa todos los campos.');
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden.');
      return false;
    }
    if (!termsAccepted) {
      toast.error('Debes aceptar los términos y condiciones.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const dataMain = { name, apellido, fechaNacimiento, genero, email, password };
    try {
      const response = await axios.post(`${URL_API}/api/auth/register`, dataMain);
      toast.success('Registration successful!');
      router.push('/auth/sign-in');
    } catch (error) {
      console.log('Error', error);
      toast.error('Revisa tus datos');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/img/fondoo.jpg')] bg-cover bg-center opacity-85">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-white p-10 rounded-2xl font-sans w-[40vw] opacity-95">
        {step === 1 && (
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Datos Personales</h2>


            <div class="flex flex-col mt-3 mb-1">
              <label class="text-gray-900 font-semibold">Nombre</label>
            </div>
            <div class="relative border border-gray-200 rounded-lg h-12 flex items-center pl-2 transition-all duration-200 ease-in-out focus-within:border-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path d="M12 2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 12c-4.42 0-8 3.58-8 8h16c0-4.42-3.58-8-8-8z" />
              </svg>
              <input value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Enter your Nombre" class="pl-5 pr-2 w-full h-full border-none rounded-lg outline-none" type="text" />
            </div>


            <div class="flex flex-col mt-3 mb-1">
              <label class="text-gray-900 font-semibold">Apellido</label>
            </div>

            <div class="relative border border-gray-200 rounded-lg h-12 flex items-center pl-2 transition-all duration-200 ease-in-out focus-within:border-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6v2h12v-2c0-3.31-2.69-6-6-6z" />
              </svg>
              <input value={apellido} onChange={(e) => setApellido(e.target.value)}
                placeholder="Enter your Apellido" class="pl-5 pr-2 w-full h-full border-none rounded-lg outline-none" type="text" />
            </div>

            <div class="flex flex-col mt-3 mb-1">
              <label class="text-gray-900 font-semibold">Fecha de Nacimiento</label>
            </div>

            <div class="relative border border-gray-200 rounded-lg h-12 flex items-center pl-2 transition-all duration-200 ease-in-out focus-within:border-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path d="M6 2v2H4v2h2v2H4v14h16V6h-2V4h-2V2H6zm8 16H10v-2h4v2zm2-4H8v-2h8v2zm-4-4H8V8h4v2z" />
              </svg>
              <input value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)}
                placeholder="Select your Date of Birth" class="pl-5 pr-2 w-full h-full border-none rounded-lg outline-none" type="date" />
            </div>

            <div class="flex flex-col mt-3 mb-1">
              <label class="text-gray-900 font-semibold">Género</label>
            </div>

            <div class="relative border border-gray-200 rounded-lg h-12 flex items-center pl-2 transition-all duration-200 ease-in-out focus-within:border-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path d="M12 2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 12c-4.42 0-8 3.58-8 8h16c0-4.42-3.58-8-8-8z" />
              </svg>
              <select value={genero} onChange={(e) => setGenero(e.target.value)} // Captura el valor seleccionado
                required
                class="pl-5 pr-2 rounded-lg border-none w-full h-full outline-none bg-transparent appearance-none">
                <option value="" disabled selected>Género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <button onClick={nextStep} type="button"
              class="bg-gray-900 text-white text-base font-medium rounded-lg h-12 w-full mt-5 mb-2 cursor-pointer">Siguiente</button>
            <p class="text-center text-black text-sm my-2">Don't have an account? <span class="text-blue-600 font-medium cursor-pointer">
              <a href="/auth/sign-in">Sign In</a>
            </span>
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Credenciales de Inicio de Sesión</h2>
            <div class="flex flex-col mb-1">
              <label class="text-gray-900 font-semibold">Email</label>
            </div>
            <div class="relative border border-gray-200 rounded-lg h-12 flex items-center pl-2 transition-all duration-200 ease-in-out focus-within:border-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400 absolute left-2" viewBox="0 0 32 32"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></svg>
              <input value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email" class="pl-8 pr-2 w-full h-full border-none rounded-lg outline-none" type="text" />
            </div>

            <div class="flex flex-col mb-1">
              <label class="text-gray-900 font-semibold">Password</label>
            </div>
            <div class="relative border border-gray-200 rounded-lg h-12 flex items-center pl-2 transition-all duration-200 ease-in-out focus-within:border-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400 absolute left-2" viewBox="-64 0 512 512"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
              <input value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password" class="pl-8 pr-2 w-full h-full border-none rounded-lg outline-none" type="password" />
            </div>

            <div class="flex flex-col mb-1">
              <label class="text-gray-900 font-semibold">Confirm Password</label>
            </div>
            <div class="relative border border-gray-200 rounded-lg h-12 flex items-center pl-2 transition-all duration-200 ease-in-out focus-within:border-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400 absolute left-2" viewBox="-64 0 512 512"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
              <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your Password" class="pl-8 pr-2 w-full h-full border-none rounded-lg outline-none" type="password" />
            </div>


            <div className="flex items-center mt-4 mb-2">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                className="mr-2"
              />
              <label className="text-gray-700">Acepto los términos y condiciones</label>
            </div>

            <button
              type="submit"
              class="bg-gray-900 text-white text-base font-medium rounded-lg h-12 w-full mt-5 mb-2 cursor-pointer opacity-95">Sign Up</button>
            <p class="text-center text-black text-sm my-2">Don't have an account? <span class="text-blue-600 font-medium cursor-pointer">
              <a href="/auth/sign-in">Sign In</a>
            </span>
            </p>
            <div className="flex justify-between">
              <button type="button" onClick={prevStep}
                class="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                </svg>
                Previous
              </button>
            </div>
          </div>
        )}
      </form>

      {/* <TermsModal 
        showModal={showModal} 
        onClose={() => setShowModal(false)} 
        onAccept={handleAcceptTerms} 
      /> */}


      {/* {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Términos y Condiciones</h2>
              <p className="text-sm text-gray-600 mb-6">
                Estos son los términos y condiciones del uso de esta aplicación...
                (Aquí puedes añadir tus términos y condiciones reales).
              </p>

              <div className="flex justify-end">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-red-600 transition duration-300"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300"
                  onClick={handleAcceptTermsClick}
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
      <ToastContainer/>
      {/* <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> */}
    </div>
    );
}
