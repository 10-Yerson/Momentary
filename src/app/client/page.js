'use client';

import ProtectedRoute from '../../components/protected/ProtectedRoute';
import UserPanel from './components/Dasboard/siderbar';
import Welcome from './components/Home';

export default function UserPage() {
    return (
        <ProtectedRoute roles={['user']}>
           <UserPanel/>
          <Welcome/> 
        </ProtectedRoute>
    );
}
