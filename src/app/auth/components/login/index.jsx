'use client'

import { useEffect, useState } from 'react';
import './main.css';
import Link from 'next/link';
import axios from '../../../../utils/axios';
import { ToastContainer, toast } from 'react-toastify'; // Asegúrate de importar 'toast'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        const dataForm = {
            email,
            password,
        };

        try {
            const response = await axios.post('/api/auth/login', dataForm);
            toast.success('Login exitoso. Bienvenido');
            const { token, role, userId } = response.data;  // Incluye `userId` en la desestructuración
            localStorage.setItem('token', token);
            sessionStorage.setItem('userId', userId); // Guardamos el ID del usuario en sessionStorage
            console.log('Datos de la respuesta:', response.data);

            // Redirige al usuario según su rol
            if (role === 'admin') {
                router.push('/admin');
            } else if (role === 'user') {
                router.push('/client');
            }
        } catch (error) {
            console.log('Error', error);
            toast.error('Verifica tus datos');

        }
    };

    return (
        <div className='flex flex-row justify-center w-screen h-screen bg-black gap-x-5'>
            <div className='w-[50vw] flex justify-end'>
                <form className="form" onSubmit={handleLogin}>
                    <div className="flex-column">
                        <label>Email </label>
                    </div>
                    <div className="inputForm">
                        <svg
                            height="20"
                            viewBox="0 0 32 32"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="Layer_3" data-name="Layer 3">
                                <path
                                    d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"
                                ></path>
                            </g>
                        </svg>
                        <input
                            value={email}  // Corregido 'vale' a 'value'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="text"
                            className="input"
                            placeholder="Enter your Email"
                        />
                    </div>

                    <div className="flex-column">
                        <label>Password </label>
                    </div>
                    <div className="inputForm">
                        <svg
                            height="20"
                            viewBox="-64 0 512 512"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"
                            ></path>
                            <path
                                d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"
                            ></path>
                        </svg>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input"
                            placeholder="Enter your Password"
                        />
                    </div>
                    <div class="flex flex-row items-center justify-between">
                        <div class="flex items-center gap-2">
                            <input type="radio" class="form-radio text-blue-600" />
                            <label class="text-black font-normal text-sm">Remember me</label>
                        </div>
                        <span class="text-blue-600 text-sm font-medium cursor-pointer">Forgot password?</span>
                    </div>
                    <button className="button-submit" type="submit">Iniciar Sesión</button>
                    <p className="p">No tienes cuenta?
                        <Link href="/auth/sign-up">
                            <span className="span">Register</span>
                        </Link>
                    </p>
                </form>
            </div>

            <div className='flex justify-center content-center w-[50vw] h-[90vh]'>
                <div className='background-dg'>.</div>
            </div>
            <ToastContainer />
        </div>
    );
}
