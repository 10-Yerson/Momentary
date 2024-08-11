import ProtectedRoute from '../../components/protected/ProtectedRoute';
import Dashboard from '@/components/SidebarADM';

export default function AdminPage() {

    return (
        <ProtectedRoute roles={['admin']}>
            <Dashboard/>
        </ProtectedRoute>
    );
}
