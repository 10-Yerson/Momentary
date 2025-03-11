'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token) {
            router.push('/auth/sign-in'); 
        } else if (allowedRoles && !allowedRoles.includes(role)) {
            router.push('/auth/sign-in'); 
        } else {
            setLoading(false); 
        }
    }, [router, allowedRoles]);

    if (loading) return <p className="text-center mt-10">Cargando...</p>;

    return <>{children}</>;
};

export default ProtectedRoute;
