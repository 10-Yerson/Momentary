'use client';

import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';
import { useRouter } from 'next/navigation';

export default function AdminVerificationsPage() {
    const [pendingList, setPendingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rejectionReasons, setRejectionReasons] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchPending = async () => {
            try {
                const res = await axios.get('/api/verification/pending', { withCredentials: true });
                setPendingList(res.data.data);
            } catch (err) {
                console.error("Error al obtener solicitudes:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPending();
    }, []);

    const handleApprove = async (userId) => {
        try {
            setLoading(true);
            await axios.post('/api/verification/process', {
                userId,
                status: 'approved'
            }, { withCredentials: true });

            setPendingList(prev => prev.filter(u => u._id !== userId));
            setSelectedUser(null);
        } catch (error) {
            console.error('Error al aprobar:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async (userId) => {
        const reason = rejectionReasons[userId] || '';
        if (!reason.trim()) {
            alert('Escribe una razón de rechazo.');
            return;
        }

        try {
            setLoading(true);
            await axios.post('/api/verification/process', {
                userId,
                status: 'rejected',
                rejectionReason: reason
            }, { withCredentials: true });

            setPendingList(prev => prev.filter(u => u._id !== userId));
            setSelectedUser(null);
        } catch (error) {
            console.error('Error al rechazar:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen ">
            <div className="max-w-7xl mx-auto px-4 py-10">

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : pendingList.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-10 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">¡No hay solicitudes pendientes!</h2>
                        <p className="text-gray-500">Todas las solicitudes han sido procesadas.</p>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/3">
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="p-4 border-b border-gray-200">
                                    <h2 className="font-semibold text-gray-800">Solicitudes pendientes ({pendingList.length})</h2>
                                </div>
                                <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                                    {pendingList.map(user => (
                                        <div 
                                            key={user._id} 
                                            className={`p-4 cursor-pointer hover:bg-gray-50 transition ${selectedUser?._id === user._id ? 'bg-blue-50' : ''}`}
                                            onClick={() => setSelectedUser(user)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <img 
                                                    src={user.profilePicture || 'https://via.placeholder.com/40'} 
                                                    alt="Perfil" 
                                                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-gray-800 truncate">{user.name} {user.apellido}</p>
                                                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                                </div>
                                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Panel de detalles */}
                        <div className="lg:flex-1">
                            {selectedUser ? (
                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <div className="flex items-center gap-4 pb-6 mb-6 border-b border-gray-100">
                                        <img 
                                            src={selectedUser.profilePicture || 'https://via.placeholder.com/80'} 
                                            alt="Perfil" 
                                            className="w-16 h-16 rounded-full object-cover border border-gray-200" 
                                        />
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800">{selectedUser.name} {selectedUser.apellido}</h2>
                                            <p className="text-gray-500">{selectedUser.email}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <h3 className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-2">Razón de verificación</h3>
                                            <p className="bg-gray-50 p-3 rounded-lg text-gray-700">{selectedUser.verificationRequest.reason}</p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-2">Documento</h3>
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <a 
                                                    href={selectedUser.verificationRequest.documents[0]} 
                                                    target="_blank"
                                                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    Ver documento
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-2">Razón para rechazar (requerido en caso de rechazo)</h3>
                                        <textarea
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                                            rows={4}
                                            placeholder="Explica el motivo por el cual se rechaza la solicitud de verificación..."
                                            value={rejectionReasons[selectedUser._id] || ''}
                                            onChange={(e) => setRejectionReasons(prev => ({ ...prev, [selectedUser._id]: e.target.value }))}
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => handleApprove(selectedUser._id)}
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                            disabled={loading}
                                        >
                                            {loading ? 'Procesando...' : 'Aprobar verificación'}
                                        </button>
                                        <button
                                            onClick={() => handleReject(selectedUser._id)}
                                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                            disabled={loading}
                                        >
                                            {loading ? 'Procesando...' : 'Rechazar verificación'}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl shadow-sm p-10 text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Selecciona una solicitud</h2>
                                    <p className="text-gray-500">Haz clic en una solicitud de la lista para ver sus detalles.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}