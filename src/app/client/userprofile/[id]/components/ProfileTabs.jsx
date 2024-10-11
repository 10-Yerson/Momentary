const ProfileTabs = () => (
  <div className="border-t mt-6">
    <div className="flex justify-around md:justify-center space-x-6 md:space-x-12 mt-4 text-xs md:text-base">
      <div className="text-center text-gray-800 hover:text-purple-500 cursor-pointer">
        <i className="fas fa-th text-sm md:text-lg"></i>
        <span className="ml-2">PUBLICACIONES</span>
      </div>
      <div className="text-center text-gray-500 hover:text-purple-500 cursor-pointer">
        <i className="fas fa-user-tag text-sm md:text-lg"></i>
        <span className="ml-2">ETIQUETAS</span>
      </div>
    </div>
  </div>
);

export default ProfileTabs;
