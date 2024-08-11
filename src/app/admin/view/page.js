'use client';

import Dashboard from '@/components/SidebarADM'
import ProtectedRoute from '../../../components/protected/ProtectedRoute';
import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';

export default function ViewAdmis() {
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axios.get('/api/admin/');
                setAdminData(response.data);
            } catch (error) {
                console.error('Error fetching admin data:', error);
                if (error.response) {
                    // El servidor respondió con un código de estado fuera del rango 2xx
                    console.error('Data:', error.response.data);
                    console.error('Status:', error.response.status);
                    console.error('Headers:', error.response.headers);
                } else if (error.request) {
                    // La solicitud se realizó pero no se recibió respuesta
                    console.error('No response received:', error.request);
                } else {
                    // Algo salió mal en la configuración de la solicitud
                    console.error('Error in setting up the request:', error.message);
                }
            }
        };

        fetchAdminData();
    }, []);
    return (
        <ProtectedRoute roles={['admin']}>
        <Dashboard/>
        <div >
            <div class="p-4 sm:ml-64">
                <div>
                    <h1>Admin Page</h1>
                    <p>Welcome Admin!</p>
                    {adminData ? (
                        <pre>{JSON.stringify(adminData, null, 2)}</pre>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    </ProtectedRoute>
    )
}
