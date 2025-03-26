'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false); // Estado para controlar el acceso

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token) {
            router.push('/auth/sign-in');
        } else if (allowedRoles && !allowedRoles.includes(role)) {
            router.push('/auth/sign-in');
        } else {
            setAuthorized(true); 
        }
    }, [router, allowedRoles]);

    if (!authorized) return null;

    return <>{children}</>;
};

export default ProtectedRoute;
