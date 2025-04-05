'use client';

import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';
import { useRouter } from 'next/navigation';

export default function AdminVerificationsPage() {
    const [pendingList, setPendingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rejectionReasons, setRejectionReasons] = useState({});
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
            await axios.post('/api/verification/process', {
                userId,
                status: 'approved'
            }, { withCredentials: true });

            setPendingList(prev => prev.filter(u => u._id !== userId));
        } catch (error) {
            console.error('Error al aprobar:', error);
        }
    };

    const handleReject = async (userId) => {
        const reason = rejectionReasons[userId] || '';
        if (!reason.trim()) {
            alert('Escribe una razón de rechazo.');
            return;
        }

        try {
            await axios.post('/api/verification/process', {
                userId,
                status: 'rejected',
                rejectionReason: reason
            }, { withCredentials: true });

            setPendingList(prev => prev.filter(u => u._id !== userId));
        } catch (error) {
            console.error('Error al rechazar:', error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Panel de Verificación de Usuarios</h1>

            {loading ? (
                <p className="text-gray-500">Cargando solicitudes...</p>
            ) : pendingList.length === 0 ? (
                <p className="text-gray-500">No hay solicitudes pendientes.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingList.map(user => (
                        <div key={user._id} className="bg-white shadow-md rounded-xl p-5 border border-gray-200">
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={user.profilePicture}
                                    alt="Perfil"
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-lg text-gray-800">{user.name} {user.apellido}</p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                            </div>

                            <div className="mb-2">
                                <p className="text-sm font-semibold text-gray-700">Razón de verificación:</p>
                                <p className="text-sm text-gray-600">{user.verificationRequest.reason}</p>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm font-semibold text-gray-700">Documento:</p>
                                <a
                                    href={user.verificationRequest.documents[0]}
                                    target="_blank"
                                    className="text-blue-600 text-sm underline"
                                >
                                    Ver documento
                                </a>
                            </div>

                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-md text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-red-400"
                                rows={3}
                                placeholder="Razón para rechazar (opcional)"
                                value={rejectionReasons[user._id] || ''}
                                onChange={(e) =>
                                    setRejectionReasons(prev => ({ ...prev, [user._id]: e.target.value }))
                                }
                            />

                            <div className="flex justify-between gap-3">
                                <button
                                    onClick={() => handleApprove(user._id)}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium transition"
                                >
                                    Aprobar
                                </button>
                                <button
                                    onClick={() => handleReject(user._id)}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-medium transition"
                                >
                                    Rechazar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
