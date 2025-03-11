import Sidebar from "../components/Sidebar";
import ProtectedRoute from "@/components/protected/ProtectedRoute";

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="flex">
        <Sidebar />
        <div className="ml-64 w-full">{children}</div>
      </div>
    </ProtectedRoute>
  );
}
