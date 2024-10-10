'use client'

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../../../utils/axios'
import ModalProfile from "../Modal/ModalProfile";

export default function Welcome() {
  const [userName, setUserName] = useState('');
  const [lastname, setLastname] = useState('');
  const [profilePicture, setProfilePicture] = useState('')
  const [isModalOpen, setModalOpen] = useState(false);

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
        console.log('Datos Usuario', response.data);
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

  return (
    <>
      <div className="h-screen flex overflow-hidden select-none ml-40 flex-1">
        <main className="pt-2 pb-2 px-10 flex-1 bg-white dark:bg-black rounded-l-lg
		      transition duration-500 ease-in-out overflow-hidden">
          <div className="flex flex-col capitalize text-3xl">
            <span className="font-semibold py-3">hello,</span>
            <p className="font-semibold text-gray-800 text-2xl">
              {userName} <span className="text-gray-600">{lastname}</span>
            </p>
          </div>
          <div className="flex">
            <div className="w-full mt-8 flex-shrink-0 flex flex-col	dark:bg-gray-600 rounded-lg bg-white">
              <div>
                <ul className="overflow-y-auto gap-5 flex">
                  <li>
                    <a className="p-5 flex flex-col justify-between bg-gray-50 dark:bg-gray-200 rounded-lg"
                      href="#">
                      <div className="flex items-center justify-between font-semibold capitalize dark:text-gray-700">
                        <span>english lesson</span>
                        <div className="flex items-center">
                          <svg
                            className="h-5 w-5 fill-current mr-1 text-gray-600"
                            viewBox="0 0 24 24">
                            <path d="M14 12l-4-4v3H2v2h8v3m12-4a10 10 0 01-19.54 3h2.13a8 8 0	100-6H2.46A10 10 0 0122 12z"></path>
                          </svg>
                          <span>4.2 mi</span>
                        </div>
                      </div>
                      <p className="text-sm font-medium leading-snugtext-gray-600 my-3">
                        Lorem ipsum, dolor sit amet consectetur
                        adipisicing elit. Explicabo assumenda porro
                        sapiente, cum nobis tempore delectus
                        consectetur ullam reprehenderit quis ducimus,
                        iusto dolor nam corporis id perspiciatis
                        consequuntur saepe excepturi.
                      </p>

                      <div className="flex justify-between">

                        <div className="flex">
                          <img
                            className="h-6 w-6 rounded-full mr-3"
                            src="https://i.pinimg.com/originals/b7/06/0b/b7060b60f6ee1beeedf7d648dabd89a1.jpg"
                            alt="" />
                          <span>
                            <span
                              className="text-blue-500
												font-semibold">
                              Regina C.
                            </span>
                            via HeyTutor
                          </span>
                        </div>

                        <p
                          className="text-sm font-medium leading-snug
										text-gray-600">
                          14 hours ago
                        </p>

                      </div>

                    </a>
                  </li>
                  <li>
                    <a
                      className="p-5 flex flex-col justify-between
								bg-gray-50 dark:bg-gray-200 rounded-lg"
                      href="#">

                      <div
                        className="flex items-center justify-between
									font-semibold capitalize dark:text-gray-700">

                        <span>english lesson</span>

                        <div className="flex items-center">
                          <svg
                            className="h-5 w-5 fill-current mr-1
											text-gray-600"
                            viewBox="0 0 24 24">
                            <path
                              d="M14 12l-4-4v3H2v2h8v3m12-4a10
												10 0 01-19.54 3h2.13a8 8 0
												100-6H2.46A10 10 0 0122 12z"></path>
                          </svg>
                          <span>4.2 mi</span>
                        </div>

                      </div>

                      <p
                        className="text-sm font-medium leading-snug
									text-gray-600 my-3">
                        Lorem ipsum, dolor sit amet consectetur
                        adipisicing elit. Explicabo assumenda porro
                        sapiente, cum nobis tempore delectus
                        consectetur ullam reprehenderit quis ducimus,
                        iusto dolor nam corporis id perspiciatis
                        consequuntur saepe excepturi.
                      </p>

                      <div className="flex justify-between">

                        <div className="flex">
                          <img
                            className="h-6 w-6 rounded-full mr-3"
                            src="https://i.pinimg.com/originals/b7/06/0b/b7060b60f6ee1beeedf7d648dabd89a1.jpg"
                            alt="Issue" />
                          <span>
                            <span
                              className="text-blue-500
												font-semibold">
                              Regina C.
                            </span>
                            via HeyTutor
                          </span>
                        </div>

                        <p
                          className="text-sm font-medium leading-snug
										text-gray-600">
                          14 hours ago
                        </p>

                      </div>

                    </a>
                  </li>
                </ul>
              </div>

            </div>

          </div>

        </main>

        <aside
          className="w-1/4 px-6 py-4 flex flex-col dark:bg-black
		dark:text-gray-100 rounded-r-lg overflow-hidden">

          <div className="flex items-center justify-between">

            <a href="#" className="relative">

              <span>
                <svg
                  className="h-5 w-5 hover:text-red-600 dark-hover:text-red-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path
                    d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </span>

              <div className="absolute w-2 h-2 left-0 mb-6 ml-2 bottom-0">
                <span
                  className="px-2 py-1 bg-red-600 rounded-full text-white
						text-xs">
                  7
                </span>
              </div>

            </a>

            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full object-cover cursor-pointer"
                src={profilePicture || 'https://metro.co.uk/wp-content/uploads/2018/09/sei_30244558-285d.jpg?quality=90&strip=all'}
                alt="tempest profile"
                onClick={() => setModalOpen(true)}
              />
              <button className="ml-1 focus:outline-none">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 192 512">
                  <path
                    d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72
                            72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72
                            72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0
                            352c0 39.8 32.2 72 72 72s72-32.2
                            72-72-32.2-72-72-72-72 32.2-72 72z"></path>
                </svg>
              </button>
            </div>

            <ModalProfile isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

          </div>

          <span className="mt-4 text-gray-600">Monthly earnings</span>
          <span className="mt-1 text-3xl font-semibold">$ 1,579.20</span>

          <button
            className="mt-8 flex items-center py-4 px-3 text-white rounded-lg
			bg-green-400 shadow focus:outline-none">

            <svg className="h-5 w-5 fill-current mr-2 ml-3" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
            </svg>

            <span>Bill your Students</span>

          </button>

          <div className="mt-12 flex items-center">
            <span>Payments</span>
            <button className="ml-2 focus:outline-none">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 256 512">
                <path
                  d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9
						0l-22.6-22.6c-9.4-9.4-9.4-24.6
						0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3
						103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1
						34z"></path>
              </svg>
            </button>
          </div>
          <a
            href="#"
            className="mt-2 p-4 flex justify-between bg-gray-100 rounded-lg
			font-semibold capitalize">


            <div className="flex">

              <img
                className="h-10 w-10 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/cX0xwvJKCNIFrl2wIwoYiIURxmZt1y7tF3wJvynqcnQG5tmYdKBLpDDvhXzmVZzrstAEkw=s151"
                alt="syndicate profile" />

              <div className="flex flex-col ml-4">

                <span>syndicate</span>
                <span className="text-sm text-gray-600">english</span>

              </div>

            </div>

            <span>$ 25</span>

          </a>
        </aside>

      </div>
    </>
  );
}
