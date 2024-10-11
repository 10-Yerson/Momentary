const ProfileBio = () => (
  <div className="mt-5 text-center md:text-left">
    <p className="text-sm md:text-base lg:text-lg text-gray-800 leading-relaxed">
      Desarrollador(a) de Software
      <br />
      Apasionado(a) por la tecnología y el código <span className="text-purple-500">💻</span>!
      <br />
      Universidad Nacional de Colombia
    </p>
    <a 
      className="text-blue-500 hover:text-blue-600 transition-colors mt-2 block"
      href="#"
      target="_blank" 
      rel="noopener noreferrer"
    >
      Perfil de LinkedIn
    </a>
    <p className="mt-2 text-gray-500 text-xs md:text-sm lg:text-base">
      Carlos sigue esta cuenta
    </p>
  </div>
);

export default ProfileBio;
