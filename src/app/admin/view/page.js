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
                        {adminData ? (
                            <pre>{JSON.stringify(adminData, null, 2)}</pre>
                        ) : (
                        
                                <div class="relative flex w-64 animate-pulse gap-2 p-4">
                                    <div class="h-12 w-12 rounded-full bg-slate-400"></div>
                                    <div class="flex-1">
                                        <div class="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
                                        <div class="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
                                    </div>
                                    <div class="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
                                </div>

                        )}
                        <div>
                            {userData ? (
                                <pre>{JSON.stringify(userData, null, 2)}</pre>
                            ) : (
                                    <div class="flex flex-row gap-2">
                                        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                                        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                                        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
                                    </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}
