import Sidebar from "../components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">{children}</div>
    </div>
  );
}
