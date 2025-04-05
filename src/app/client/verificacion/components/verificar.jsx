'use client';

import React, { useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import {
    FiShield,
    FiClock,
    FiXCircle,
    FiUploadCloud,
    FiLoader,
} from 'react-icons/fi';
import { FaCheckCircle } from 'react-icons/fa';

export default function VerificacionUsuario() {
    const [estado, setEstado] = useState(null);
    const [documento, setDocumento] = useState(null);
    const [razon, setRazon] = useState('');
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState(null);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await axios.get('/api/verification/status', {
                    withCredentials: true,
                });
                setEstado(res.data.data);
                console.log(res.data.data);
            } catch (err) {
                console.error('Error al obtener estado de verificación:', err);
            }
        };

        fetchStatus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje(null);

        if (!documento || !razon) {
            setMensaje("Debes completar todos los campos");
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('document', documento);
            formData.append('reason', razon);

            const res = await axios.post('/api/verification/request', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setEstado(res.data.data);
            setMensaje("✅ Solicitud enviada correctamente");
        } catch (err) {
            console.error('Error al enviar solicitud:', err);
            setMensaje("❌ Hubo un error al enviar la solicitud");
        } finally {
            setLoading(false);
        }
    };

    const renderEstado = () => {
        if (!estado) {
            return (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                    <FiLoader className="animate-spin" />
                    Cargando estado...
                </div>
            );
        }

        const status = estado.verificationStatus;

        if (status === 'approved') {
            return (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <FaCheckCircle className="text-green-600" />
                    Verificado
                </div>
            );
        }

        if (status === 'pending') {
            return (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    <FiClock className="text-yellow-600" />
                    En revisión
                </div>
            );
        }

        if (status === 'rejected') {
            return (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    <FiXCircle className="text-red-600" />
                    Rechazado
                </div>
            );
        }

        // Default (none o desconocido)
        return (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                <FiXCircle className="text-gray-500" />
                Sin solicitud
            </div>
        );
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                    <FiShield className="text-blue-600" />
                    Verificación de cuenta
                </h2>

                <div className="mb-6">{renderEstado()}</div>

                {estado?.rejectionReason && (
                    <div className="text-sm text-red-600 mb-4">
                        <strong>Motivo del rechazo:</strong> {estado.rejectionReason}
                    </div>
                )}

                {estado?.documents?.[0] && (
                    <div className="mb-4 border p-3 rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-700 mb-1">Documento enviado:</p>
                        <a
                            href={estado.documents[0]}
                            target="_blank"
                            className="text-blue-600 underline hover:text-blue-800 transition"
                        >
                            Ver documento
                        </a>
                    </div>
                )}

                {(estado?.verificationStatus === 'none' || estado?.verificationStatus === 'rejected') && (
                    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1">Motivo de la solicitud</label>
                            <textarea
                                value={razon}
                                onChange={(e) => setRazon(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                                placeholder="Explica por qué deseas verificar tu cuenta"
                                rows={4}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-1">Documento (imagen)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setDocumento(e.target.files[0])}
                                className="w-full text-sm border rounded-lg p-2"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <FiLoader className="animate-spin w-5 h-5" />
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    <FiUploadCloud className="w-5 h-5" />
                                    Enviar solicitud
                                </>
                            )}
                        </button>
                        {mensaje && <p className="text-sm text-center mt-2 text-gray-700">{mensaje}</p>}
                    </form>
                )}

                {estado?.verificationStatus === 'pending' && (
                    <p className="text-sm text-yellow-700 mt-6">
                        Tu solicitud está siendo revisada. Te notificaremos pronto.
                    </p>
                )}

                {estado?.verificationStatus === 'approved' && (
                    <p className="text-sm text-green-700 mt-6">
                        Tu cuenta ya está verificada. ¡Gracias por confiar en nosotros!
                    </p>
                )}
            </div>
        </div>
    );
}
