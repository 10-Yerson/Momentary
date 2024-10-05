// src/components/ProfileTabs.jsx
const ProfileTabs = () => (
    <div className="border-t mt-6">
      <div className="flex justify-center space-x-12 mt-4">
        <div className="text-center">
          <i className="fas fa-th"></i>
          <span className="ml-2">PUBLICACIONES</span>
        </div>
        <div className="text-center text-gray-500">
          <i className="fas fa-user-tag"></i>
          <span className="ml-2">ETIQUETAS</span>
        </div>
      </div>
    </div>
  );
  
  export default ProfileTabs;
  