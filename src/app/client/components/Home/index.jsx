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
      <div class="h-screen flex overflow-hidden select-none ml-32 flex-1">
        <main
          class="my-1 pt-2 pb-2 px-10 flex-1 bg-gray-200 dark:bg-black rounded-l-lg
		transition duration-500 ease-in-out overflow-y-auto">
          <div class="flex flex-col capitalize text-3xl">
            <span class="font-semibold py-3">hello,</span>
            <p className="font-semibold text-gray-800 text-2xl">
          {userName} <span className="text-gray-600">{lastname}</span>
        </p>
          </div>
          <div class="flex">
            <div
              class="mr-6 w-1/2 mt-8 py-2 flex-shrink-0 flex flex-col bg-white
				dark:bg-gray-600 rounded-lg">

              <h3
                class="flex items-center pt-1 pb-1 px-8 text-lg font-semibold
					capitalize dark:text-gray-300">
                <span>nearby jobs</span>
                <button class="ml-2">
                  <svg class="h-5 w-5 fill-current" viewBox="0 0 256 512">
                    <path
                      d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9
								0l-22.6-22.6c-9.4-9.4-9.4-24.6
								0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6
								0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136
								136c9.5 9.4 9.5 24.6.1 34z"></path>
                  </svg>
                </button>
              </h3>

              <div>

                <ul class="pt-1 pb-2 px-3 overflow-y-auto">

                  <li class="mt-2">

                    <a
                      class="p-5 flex flex-col justify-between
								bg-gray-100 dark:bg-gray-200 rounded-lg"
                      href="#">

                      <div
                        class="flex items-center justify-between
									font-semibold capitalize dark:text-gray-700">

                        <span>english lesson</span>

                        <div class="flex items-center">
                          <svg
                            class="h-5 w-5 fill-current mr-1
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
                        class="text-sm font-medium leading-snug
									text-gray-600 my-3">
                        Lorem ipsum, dolor sit amet consectetur
                        adipisicing elit. Explicabo assumenda porro
                        sapiente, cum nobis tempore delectus
                        consectetur ullam reprehenderit quis ducimus,
                        iusto dolor nam corporis id perspiciatis
                        consequuntur saepe excepturi.
                      </p>

                      <div class="flex justify-between">

                        <div class="flex">
                          <img
                            class="h-6 w-6 rounded-full mr-3"
                            src="https://i.pinimg.com/originals/b7/06/0b/b7060b60f6ee1beeedf7d648dabd89a1.jpg"
                            alt="" />
                          <span>
                            <span
                              class="text-blue-500
												font-semibold">
                              Regina C.
                            </span>
                            via HeyTutor
                          </span>
                        </div>

                        <p
                          class="text-sm font-medium leading-snug
										text-gray-600">
                          14 hours ago
                        </p>

                      </div>

                    </a>
                  </li>
                  <li class="mt-2">

                    <a
                      class="p-5 flex flex-col justify-between
								bg-gray-100 dark:bg-gray-200 rounded-lg"
                      href="#">

                      <div
                        class="flex items-center justify-between
									font-semibold capitalize dark:text-gray-700">

                        <span>english lesson</span>

                        <div class="flex items-center">
                          <svg
                            class="h-5 w-5 fill-current mr-1
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
                        class="text-sm font-medium leading-snug
									text-gray-600 my-3">
                        Lorem ipsum, dolor sit amet consectetur
                        adipisicing elit. Explicabo assumenda porro
                        sapiente, cum nobis tempore delectus
                        consectetur ullam reprehenderit quis ducimus,
                        iusto dolor nam corporis id perspiciatis
                        consequuntur saepe excepturi.
                      </p>

                      <div class="flex justify-between">

                        <div class="flex">
                          <img
                            class="h-6 w-6 rounded-full mr-3"
                            src="https://i.pinimg.com/originals/b7/06/0b/b7060b60f6ee1beeedf7d648dabd89a1.jpg"
                            alt="Issue" />
                          <span>
                            <span
                              class="text-blue-500
												font-semibold">
                              Regina C.
                            </span>
                            via HeyTutor
                          </span>
                        </div>

                        <p
                          class="text-sm font-medium leading-snug
										text-gray-600">
                          14 hours ago
                        </p>

                      </div>

                    </a>
                  </li>
                </ul>

                <a
                  href="#"
                  class="flex justify-center capitalize text-blue-500
						dark:text-blue-200">
                  <span>see all</span>
                </a>

              </div>

            </div>

            <div
              class="mr-6 w-1/2 mt-8 py-2 flex-shrink-0 flex flex-col
				bg-purple-300 rounded-lg text-white">

              <h3
                class="flex items-center pt-1 pb-1 px-8 text-lg font-bold
					capitalize">
                <span>scheduled lessons</span>
                <button class="ml-2">
                  <svg class="h-5 w-5 fill-current" viewBox="0 0 256 512">
                    <path
                      d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9
								0l-22.6-22.6c-9.4-9.4-9.4-24.6
								0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6
								0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136
								136c9.5 9.4 9.5 24.6.1 34z"></path>
                  </svg>
                </button>
              </h3>

              <div class="flex flex-col items-center mt-12">
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/empty-state-2130362-1800926.png"
                  alt=" empty schedule" />

                <span class="font-bold mt-8">Your schedule is empty</span>

                <span class="text-purple-500">
                  Make your first appointment
                </span>

                <button class="mt-8 bg-purple-800 rounded-lg py-2 px-4">
                  Find a Job
                </button>

              </div>
            </div>

          </div>

        </main>

        <aside
          class="w-1/4 my-1 mr-1 px-6 py-4 flex flex-col bg-gray-200 dark:bg-black
		dark:text-gray-400 rounded-r-lg overflow-y-auto">

          <div class="flex items-center justify-between">

            <a href="#" class="relative">

              <span>
                <svg
                  class="h-5 w-5 hover:text-red-600 dark-hover:text-red-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  <path
                    d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </span>

              <div class="absolute w-2 h-2 left-0 mb-6 ml-2 bottom-0">
                <span
                  class="px-2 py-1 bg-red-600 rounded-full text-white
						text-xs">
                  7
                </span>
              </div>

            </a>

            <div class="flex items-center">
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

          <span class="mt-4 text-gray-600">Monthly earnings</span>
          <span class="mt-1 text-3xl font-semibold">$ 1,579.20</span>

          <button
            class="mt-8 flex items-center py-4 px-3 text-white rounded-lg
			bg-green-400 shadow focus:outline-none">

            <svg class="h-5 w-5 fill-current mr-2 ml-3" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
            </svg>

            <span>Bill your Students</span>

          </button>

          <div class="mt-12 flex items-center">
            <span>Payments</span>
            <button class="ml-2 focus:outline-none">
              <svg class="h-5 w-5 fill-current" viewBox="0 0 256 512">
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
            class="mt-8 p-4 flex justify-between bg-gray-300 rounded-lg
			font-semibold capitalize">

            <div class="flex">

              <img
                class="h-10 w-10 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/cX0xwvJKCNIFrl2wIwoYiIURxmZt1y7tF3wJvynqcnQG5tmYdKBLpDDvhXzmVZzrstAEkw=s151"
                alt="veldora profile" />

              <div class="flex flex-col ml-4">

                <span>veldora</span>
                <span class="text-sm text-gray-600">english</span>

              </div>

            </div>

            <span>$ 25</span>

          </a>

          <a
            href="#"
            class="mt-2 p-4 flex justify-between bg-gray-300 rounded-lg
			font-semibold capitalize">

            <div class="flex">

              <img
                class="h-10 w-10 rounded-full object-cover"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1RZ5sKLtFG-Q2xfXlLa5DbFsmF52Gc-C49B4s63CtSxLkzQY&s"
                alt="accelerator profile" />

              <div class="flex flex-col ml-4">

                <span>accelerator</span>
                <span class="text-sm text-gray-600">english</span>

              </div>

            </div>

            <span>$ 25</span>

          </a>

          <a
            href="#"
            class="mt-2 p-4 flex justify-between bg-gray-300 rounded-lg
			font-semibold capitalize">


            <div class="flex">

              <img
                class="h-10 w-10 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/cX0xwvJKCNIFrl2wIwoYiIURxmZt1y7tF3wJvynqcnQG5tmYdKBLpDDvhXzmVZzrstAEkw=s151"
                alt="syndicate profile" />

              <div class="flex flex-col ml-4">

                <span>syndicate</span>
                <span class="text-sm text-gray-600">english</span>

              </div>

            </div>

            <span>$ 25</span>

          </a>

          <div class="mt-4 flex justify-center capitalize text-blue-600">
            <a href="#">see all</a>
          </div>

        </aside>

      </div>
    </>
  );
}
