'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../utils/axios'; // Asegúrate de que la ruta sea correcta

const ProtectedRoute = ({ children, allowedRoles }) => {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('/api/auth/check-auth'); // Ruta en el backend para verificar sesión
                const { role } = response.data;

                if (allowedRoles && !allowedRoles.includes(role)) {
                    router.push('/auth/sign-in');
                } else {
                    setAuthorized(true);
                }
            } catch (error) {
                router.push('/auth/sign-in');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router, allowedRoles]);

    if (!authorized) return null;

    return <>{children}</>;
};

export default ProtectedRoute;
