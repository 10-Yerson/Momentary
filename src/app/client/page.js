'use client';

import ProtectedRoute from '../../components/protected/ProtectedRoute';
import { useEffect, useState } from 'react';
import axios from '../../utils/axios';

export default function UserPage() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('user');
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <ProtectedRoute roles={['user', 'admin']}>
            <div>
                <h1>User Page</h1>
                <p>Welcome User!</p>
                {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>}
            </div>
        </ProtectedRoute>
    );
}
