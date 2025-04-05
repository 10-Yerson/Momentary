
'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiUsers, FiSettings, FiFileText, FiHome, FiCheckCircle, FiLogOut } from "react-icons/fi";
import axios from '../../../utils/axios'; 

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      router.push('/');
      console.log("Sesión cerrada correctamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="w-64 h-screen bg-[#FCFEFD] text-gray-900 p-5 fixed shadow-lg border-r border-gray-300 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-[#31DCB7] text-center">Admin Panel</h2>

        <ul className="space-y-2">
          <SidebarItem href="/admin" icon={<FiHome size={20} />} text="Dashboard" active={pathname === "/admin"} />
          <SidebarItem href="/admin/users" icon={<FiUsers size={20} />} text="Usuarios" active={pathname === "/admin/users"} />
          <SidebarItem href="/admin/posts" icon={<FiFileText size={20} />} text="Publicaciones" active={pathname === "/admin/posts"} />
          <SidebarItem href="/admin/verification" icon={<FiCheckCircle size={20} />} text="Verificaciones" active={pathname === "/admin/verification"} />
          <SidebarItem href="/admin/settings" icon={<FiSettings size={20} />} text="Configuraciones" active={pathname === "/admin/settings"} />
        </ul>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 w-full text-left rounded-lg transition-all duration-300 hover:bg-red-500 hover:text-white"
          >
            <FiLogOut size={20} />
            <span className="font-medium">Salir</span>
          </button>
        </li>
      </div>
    </div>
  );
}

function SidebarItem({ href, icon, text, active }) {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
          active ? "bg-[#31DCB7] text-white" : "hover:bg-[#5060BC] hover:text-white"
        }`}
      >
        {icon}
        <span className="font-medium">{text}</span>
      </Link>
    </li>
  );
}
