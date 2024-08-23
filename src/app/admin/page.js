import ProtectedRoute from '../../components/protected/ProtectedRoute';
import Dashboard from '@/app/admin/components/SidebarADM';

export default function AdminPage() {

    return (
        <ProtectedRoute roles={['admin']}>
            <Dashboard/>
        </ProtectedRoute>
    );
}
