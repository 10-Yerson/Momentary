'use client'

import { useEffect, useState } from "react";
import axios from '../../../../utils/axios';

export default function InfoUser() {
    const [user, setUser] = useState(null); // Cambia el estado inicial a `null` para manejarlo más fácilmente

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    throw new Error('ID del usuario no encontrado en localStorage');
                }
                const response = await axios.get(`/api/user/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    
    return (
        <div className="hidden md:block w-full md:w-1/2">
            <h1>En Proceso de realizacion</h1>
        </div>
    );
}
