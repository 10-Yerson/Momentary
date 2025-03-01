
'use client'

import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ Importa usePathname
import { FiUsers, FiSettings, FiFileText, FiHome } from "react-icons/fi"; // Iconos

export default function Sidebar() {
    const pathname = usePathname(); // ✅ Obtiene la ruta actual

  return (
    <div className="w-64 h-screen bg-[#FCFEFD] text-gray-900 p-5 fixed shadow-lg border-r border-gray-300">
      {/* Logo o título */}
      <h2 className="text-2xl font-bold mb-6 text-[#31DCB7] text-center">Admin Panel</h2>

      <ul className="space-y-2">
        <SidebarItem href="/admin" icon={<FiHome size={20} />} text="Dashboard" active={pathname === "/admin"} />
        <SidebarItem href="/admin/users" icon={<FiUsers size={20} />} text="Usuarios" active={pathname === "/admin/users"} />
        <SidebarItem href="/admin/posts" icon={<FiFileText size={20} />} text="Publicaciones" active={pathname === "/admin/posts"} />
        <SidebarItem href="/admin/settings" icon={<FiSettings size={20} />} text="Configuraciones" active={pathname === "/admin/settings"} />
      </ul>
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