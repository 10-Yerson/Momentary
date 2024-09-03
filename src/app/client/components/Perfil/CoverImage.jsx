export default function CoverImage() {
    return (
      <div
        className="w-full bg-gray-300 h-80 relative bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url('https://s1.1zoom.me/b5340/13/Footbal_Russia_FIFA_World_Cup_2018_Adidas_Telstar_549120_2560x1440.jpg')` }}
      >
        <button className="absolute bottom-4 right-4 bg-white p-2 rounded shadow">
          <i className="fas fa-camera"></i> Añadir foto de portada
        </button>
      </div>
    );
  }
  