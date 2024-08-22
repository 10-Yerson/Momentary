'use client';

import ProtectedRoute from '../../components/protected/ProtectedRoute';
import UserPanel from '@/components/Dasboard';

export default function UserPage() {
    return (
        <ProtectedRoute roles={['user', 'admin']}>
           <UserPanel/>
        </ProtectedRoute>
    );
}
