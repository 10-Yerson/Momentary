'use client'
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "../../../../utils/axios";

const socket = io(process.env.NEXT_PUBLIC_BASE_URL);
import { FaCheck, FaCheckDouble, FaPaperPlane, FaSearch, FaRegEdit, FaCog, FaArrowLeft, FaPhone, FaVideo, FaLock, FaCamera, FaImage, FaMicrophone, FaSmile, FaThumbsUp, FaRegCheckCircle } from "react-icons/fa";
import { FaCheckCircle, FaTrash } from "react-icons/fa"; // Icono azul de visto
const Messages = () => {
    const [activeUsers, setActiveUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [inbox, setInbox] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState(null);

    const [search, setSearch] = useState("");
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [userIM, setUser] = useState('');

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (!storedUserId) {
            console.error("ID del usuario no encontrado");
            return;
        }
        setUserId(storedUserId);
        socket.emit("join", storedUserId);

        const fetchUsers = async () => {
            try {
                const response = await axios.get(`/api/followers/seguidos/${storedUserId}`);
                setActiveUsers(response.data);
                console.log(JSON.stringify(response.data, null, 2) + " msg");
            } catch (error) {
                console.error("Error al obtener usuarios seguidos:", error);
            }
        };

        // Obtener la bandeja de entrada
        const fetchInbox = async () => {
            try {
                const response = await axios.get(`/api/messages/inbox`);
                setInbox(response.data);
            } catch (error) {
                console.error("Error al obtener la bandeja de entrada:", error);
            }
        };

        fetchUsers();
        fetchInbox();

        socket.on("receiveMessage", (newMessage) => {
            if (selectedUser && newMessage.sender === selectedUser._id) {
                setMessages((prev) => [...prev, newMessage]);
                markMessageAsSeen(newMessage._id);
            }
            // Actualizar la bandeja de entrada en tiempo real
            fetchInbox();
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, [selectedUser]);

    const selectUser = async (user) => {
        setSelectedUser(user);
        try {
            const res = await axios.get(`/api/messages/${user._id}`);
            setMessages(res.data);

            res.data.forEach((msg) => {
                if (!msg.seen && msg.receiver === userId) {
                    markMessageAsSeen(msg._id);
                }
            });
        } catch (err) {
            console.error("Error al obtener mensajes:", err);
        }
    };

    const sendMessage = async () => {
        if (!message.trim() || !selectedUser) return;

        try {
            const { data } = await axios.post("/api/messages/", {
                receiver: selectedUser._id,
                message
            });

            setMessages([...messages, data]);
            socket.emit("sendMessage", { sender: userId, receiver: selectedUser._id, message });

            setMessage("");
        } catch (error) {
            console.error("Error al enviar mensaje:", error);
        }
    };

    const markMessageAsSeen = async (msgId) => {
        console.log("Marcando mensaje como visto, ID:", msgId); // Debug
        if (!msgId) {
            console.error("Error: msgId es undefined");
            return;
        }

        try {
            await axios.put(`/api/messages/seen/${msgId}`);
        } catch (error) {
            console.error("Error al marcar mensaje como visto:", error);
        }
    };


    const deleteMessage = async (msgId) => {
        try {
            await axios.delete(`/api/messages/${msgId}`);
            setMessages(messages.filter((msg) => msg._id !== msgId));
        } catch (error) {
            console.error("Error al eliminar mensaje:", error);
        }
    };
    const messagesEndRef = useRef(null);
    // Efecto para hacer scroll automático al último mensaje
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]); // Se ejecuta cada vez que los mensajes cambian

    useEffect(() => {
        if (selectedUser) {
            console.log("Usuario seleccionado:", selectedUser);
        }
    }, [selectedUser]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) throw new Error('ID del usuario no encontrado en localStorage');
                const response = await axios.get(`/api/user/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);


    return (
        <div className="flex justify-around w-full overflow-hidden">

            <div className={`w-full lg:w-[55%] bg-white shadow-md rounded-lg p-4 ${selectedUser ? "hidden md:block" : "block"}`}>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-semibold">Chats</h1>
                    <div className="flex gap-3">
                        <FaCog className="text-gray-600 text-lg" />
                        <FaRegEdit className="text-gray-600 text-lg" />
                    </div>
                </div>

                <div className="relative mb-4">
                    <FaSearch className="absolute left-3 top-3 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Buscar"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border rounded-full focus:outline-none focus:ring"
                    />
                </div>

                <div className="w-full bg-white rounded-lg p-2">
                    <h2 className="text-sm font-semibold text-gray-700 mb-2">Historias</h2>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {/* Botón para añadir historia */}
                        <div className="text-center">
                            <div className="relative w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-blue-500">
                                <button className="w-full h-full flex items-center justify-center text-blue-500 text-3xl font-bold">
                                    +
                                </button>
                            </div>
                            <p className="text-xs mt-1">Añadir</p>
                        </div>

                        {/* Mostrar historias de usuarios */}
                        {activeUsers.length > 0 ? (
                            activeUsers.map((user, index) => (
                                <div key={index} className="text-center">
                                    <div className="relative w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-blue-500">
                                        {user.profilePicture ? (
                                            <img
                                                src={user.profilePicture}
                                                alt={`${user.name} ${user.apellido}`}
                                                className="w-full h-full object-cover"
                                                onClick={() => selectUser(user)}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500">?</div>
                                        )}
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                    </div>
                                    <p className="text-xs mt-1">{user.name}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">¡Sigue a alguien y empieza a chatear!</p>
                        )}
                    </div>
                </div>
                <h2 className="text-sm text-gray-600 mt-4 mb-2">Más recientes</h2>
                {inbox.length === 0 ? (
                    <p className="text-sm text-gray-500">No hay conversaciones recientes.</p>
                ) : (
                    inbox.map((conversation) => (
                        <div
                            key={conversation.userId}
                            onClick={() => selectUser(conversation.user)}
                            className={`flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer 
                            ${selectedUser?.userId === conversation.userId ? 'bg-gray-200' : ''}`}
                        >
                            {/* Imagen de perfil */}
                            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                                <img
                                    src={conversation.user?.profilePicture || "/default-profile.jpg"}
                                    alt={conversation.user?.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Nombre y último mensaje */}
                            <div className="flex-1">
                                <h3 className="font-medium">{conversation.user?.name} {conversation.user?.apellido}</h3>
                                <p className={`text-sm truncate ${conversation.unreadCount > 0 ? 'font-bold text-black' : 'text-gray-500'}`}>
                                    {conversation.lastMessage}
                                </p>
                            </div>

                            {/* Fecha del último mensaje */}
                            <div className="text-xs text-gray-400">{new Date(conversation.lastMessageTime).toLocaleDateString()}</div>

                            {/* Indicador de no leído */}
                            {conversation.unreadCount > 0 && (
                                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                            )}

                            {/* ✅ Indicador de "Visto" SOLO si el usuario es el remitente */}
                            {conversation.lastMessageSender === userId && conversation.unreadCount === 0 && (
                                <div className="w-4 h-4">
                                    <img
                                        src="/check-double.svg" // Ícono de doble check azul
                                        alt="Visto"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            <div className={`flex flex-col h-screen w-full lg:w-[45%] shadow-md rounded-2xl py-1 ${selectedUser ? "block" : "hidden md:block"}`}>
                {selectedUser ? (
                    <>
                        <div className="flex relative items-center justify-between p-2 bg-white shadow rounded-b-lg">
                            <div className="flex items-center">
                                <FaArrowLeft onClick={() => setSelectedUser(null)} className="text-blue-500 text-xl " />
                                <img src={selectedUser?.profilePicture} alt="User profile" className="rounded-full ml-2 h-14 w-14 object-cover" />
                                <div className="ml-2">
                                    <div className="font-bold">{selectedUser.name} {selectedUser.apellido}</div>
                                    <div className="text-gray-500 text-sm">Activo(a) hace 28 minutos</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                            <div className="flex flex-col items-center p-4">
                                <img src={selectedUser?.profilePicture} alt="User profile large" className="rounded-xl h-24 w-24 object-cover" />
                                <div className="font-bold text-xl mt-2">{selectedUser.name} {selectedUser.apellido}</div>
                                <div className="bg-gray-100 p-2 rounded-xl mt-2 text-center">
                                    Cifrado de extremo a extremo
                                    <div className="text-gray-500 text-sm">
                                        Los mensajes y las llamadas están protegidos con cifrado de extremo a extremo.
                                    </div>
                                </div>
                            </div>

                            <div className="p-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg._id}
                                        className={`flex items-start mb-4 ${msg.sender === userId ? "justify-end" : "justify-start"}`}
                                    >
                                        {msg.sender !== userId && (
                                            <img src={selectedUser?.profilePicture} alt="User profile" className="rounded-full h-9 w-9 object-cover" />
                                        )}

                                        <div
                                            className={`relative ml-2 p-2 rounded-lg shadow-md max-w-xs cursor-pointer ${msg.sender === userId ? "bg-blue-500 text-white" : "bg-gray-100 text-black"}`}
                                            onClick={() => setSelectedMessage(selectedMessage === msg._id ? null : msg._id)}
                                        >
                                            <p className="text-md break-words max-w-xs">{msg.message}</p>

                                            {msg.sender === userId && selectedMessage === msg._id && (
                                                <button
                                                    className="absolute top-0 right-0 mt-1 mr-1 text-red-500"
                                                    onClick={() => deleteMessage(msg._id)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            )}
                                        </div>

                                        {msg.sender === userId && (
                                            <div className="flex items-center ml-2">
                                                {msg.seen ? (
                                                    <FaCheckCircle className="text-blue-500 w-5 h-5" />
                                                ) : (
                                                    <FaRegCheckCircle className="text-gray-400 w-5 h-5" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        <div className="flex items-center p-2 bg-gray-100 rounded-md shadow rounded-t-lg">
                            <FaImage className="text-blue-500 text-2xl ml-4" />
                            <FaSmile className="text-blue-500 text-2xl ml-4" />
                            <input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                type="text"
                                placeholder="Mensaje"
                                className="flex-1 mx-4 p-2 border rounded-full"
                            />
                            <FaPaperPlane onClick={sendMessage} className="text-blue-500 text-2xl " />
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">

                        <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                            <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                                <img src={userIM?.profilePicture} alt="Imagen de chat" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                    ¿Sabías que chatear mejora tu ánimo? 😊
                                </h5>
                                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                                    Conectar con otros y compartir momentos puede hacerte sentir mejor. ¡Empieza ahora!
                                </p>
                            </div>
                            <div className="p-6 pt-0">
                                <button data-ripple-light="true" type="button" className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                    Empezar a chatear
                                </button>
                            </div>
                        </div>


                    </div>
                )}
            </div>

        </div>

    );
};

export default Messages;

