'use client';

import Dashboard from '@/app/admin/components/SidebarADM'
import ProtectedRoute from '../../../components/protected/ProtectedRoute';
import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ViewAdmis() {
    const [adminData, setAdminData] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userResponse, adminResponse] = await Promise.all([
                    axios.get('/api/user/'),
                    axios.get('/api/admin/')
                ]);

                setUserData(userResponse.data);
                setAdminData(adminResponse.data);

                toast.info('Datos cargados correctamente');
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Error cargando datos');
            }
        };

        fetchData();
    }, []);

    return (
        <ProtectedRoute roles={['admin']}>
            <Dashboard />
            <div>
                <ToastContainer />
                <div className="p-4 sm:ml-64">
                    <div>
                        <h1>Admin Page</h1>
                        <p>Welcome Admin!</p>
                        {adminData ? (
                            <pre>{JSON.stringify(adminData, null, 2)}</pre>
                        ) : (
                            <p>Cargando Administradores...</p>
                        )}
                        <div>
                            {userData ? (
                                <pre>{JSON.stringify(userData, null, 2)}</pre>
                            ) : (
                                <p>Cargando Usuario...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}
