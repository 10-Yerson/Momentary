import UserPanel from '../components/Dasboard/siderbar'
import Messages from './components/messages'

export default function page() {

  return (
 
      <div>
        <UserPanel />
        <main className="flex overflow-hidden select-none md:ml-40 ml-0 flex-1 mb-24 lg:mb-0">
          <Messages />
        </main>
      </div>
  )
}  

// 'use client'
// import { useState, useEffect } from "react";
// import { FaSearch, FaRegEdit, FaCog } from "react-icons/fa";
// import axios from '../../../../utils/axios';

// export default function Messages() {

//     const [activeUsers, setActiveUsers] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const userId = localStorage.getItem('userId');
//                 if (!userId) throw new Error('ID del usuario no encontrado en localStorage');
//                 const response = await axios.get(`/api/followers/seguidos/${userId}`);
//                 setActiveUsers(response.data);
//                 console.log(JSON.stringify(response.data, null, 2) + " msg");

//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         fetchData();
//     }, []);

//     const [search, setSearch] = useState("");


//     const recentChats = [
//         { name: "Yulieth Serna", message: "Ya te agrego", date: "mié.", unread: true, img: "/user5.jpg" },
//     ];




//     return (
//         <div className="bg-white w-full flex">

//             <div className="w-full md:w-1/2 mx-auto bg-white shadow-lg rounded-lg p-4">
//                 <div className="flex justify-between items-center mb-4">
//                     <h1 className="text-xl font-semibold">Chats</h1>
//                     <div className="flex gap-3">
//                         <FaCog className="text-gray-600 text-lg" />
//                         <FaRegEdit className="text-gray-600 text-lg" />
//                     </div>
//                 </div>


//                 <div className="relative mb-4">
//                     <FaSearch className="absolute left-3 top-3 text-gray-500" />
//                     <input
//                         type="text"
//                         placeholder="Buscar"
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className="w-full pl-10 pr-3 py-2 border rounded-full focus:outline-none focus:ring"
//                     />
//                 </div>

//                 <div className="w-full bg-white rounded-lg p-2">
//                     <h2 className="text-sm font-semibold text-gray-700 mb-2">Historias</h2>

//                     <div className="flex gap-4 overflow-x-auto pb-2">
//                         {/* Botón para añadir historia */}
//                         <div className="text-center">
//                             <div className="relative w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-blue-500">
//                                 <button className="w-full h-full flex items-center justify-center text-blue-500 text-3xl font-bold">
//                                     +
//                                 </button>
//                             </div>
//                             <p className="text-xs mt-1">Añadir</p>
//                         </div>

//                         {/* Mostrar historias de usuarios */}
//                         {activeUsers.length > 0 ? (
//                             activeUsers.map((user, index) => (
//                                 <div key={index} className="text-center">
//                                     <div className="relative w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-blue-500">
//                                         {user.profilePicture ? (
//                                             <img
//                                                 src={user.profilePicture}
//                                                 alt={`${user.name} ${user.apellido}`}
//                                                 className="w-full h-full object-cover"
//                                             />
//                                         ) : (
//                                             <div className="w-full h-full flex items-center justify-center text-gray-500">?</div>
//                                         )}
//                                         <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
//                                     </div>
//                                     <p className="text-xs mt-1">{user.name}</p>
//                                 </div>
//                             ))
//                         ) : (
//                             <p className="text-sm text-gray-500">No hay historias disponibles.</p>
//                         )}
//                     </div>
//                 </div>

//                 <h2 className="text-sm text-gray-600 mt-4 mb-2">Más recientes</h2>
//                 <div>
//                     {recentChats.map((chat, index) => (
//                         <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
//                             <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
//                                 {chat.img ? (
//                                     <img src={chat.img} alt={chat.name} className="w-full h-full object-cover" />
//                                 ) : (
//                                     <div className="w-full h-full flex items-center justify-center text-gray-500">?</div>
//                                 )}
//                             </div>
//                             <div className="flex-1">
//                                 <h3 className="font-medium">{chat.name}</h3>
//                                 <p className="text-sm text-gray-500 truncate">{chat.message}</p>
//                             </div>
//                             <div className="text-xs text-gray-400">{chat.date}</div>
//                             {chat.unread && <span className="w-3 h-3 bg-blue-500 rounded-full"></span>}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }
