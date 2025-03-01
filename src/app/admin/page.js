
import ProtectedRoute from '../../components/protected/ProtectedRoute';
import Dashboard from './components/Dashboard';
import AdminLayout from "./layouts/AdminLayout";


export default function AdminPage() {

    return (
        <ProtectedRoute roles={['admin']}>
            <AdminLayout>
                <Dashboard/>
            </AdminLayout>
        </ProtectedRoute>
    );
}
