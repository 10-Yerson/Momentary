import UserPanel from "../components/Dasboard/siderbar/index";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <UserPanel />
      <div className="w-full md:ml-48 lg:ml-52 sm:px-0 md:px-3 lg:px-3">{children}</div>
    </div>
  );
}
