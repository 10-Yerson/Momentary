'use client'

import { useEffect, useState } from "react"
import axios from '../../../../utils/axios'


export default function InfoUser() {
    const [user, setUser] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    throw new Error('ID del usuario no encontrado en localStorage');
                }
                const response = await axios.get(`/api/user/${userId}`);
                console.log('Usuario Profile ', response.data)
                setUser(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    return (
        <div className="hidden md:block w-full md:w-1/2 bg-slate-600 ">
            <div className='flex-col w-full md:w-[40%] fixed right-0 '>
                <p>Datos de ti</p>
                <div className="flex space-x-1">
                    <h4>Tu Correo Electronico </h4>
                    <p className="">{user.email}</p>
                </div>
                <h1>{user.password}</h1>
                

            </div>
        </div>
    )
}
