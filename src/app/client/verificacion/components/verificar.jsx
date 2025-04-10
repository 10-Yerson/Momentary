'use client';

import React, { useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import {
    FiShield,
    FiClock,
    FiXCircle,
    FiUploadCloud,
    FiLoader,
    FiAlertCircle,
    FiCheckCircle,
    FiFileText,
    FiInfo
} from 'react-icons/fi';

export default function VerificacionUsuario() {
    const [estado, setEstado] = useState(null);
    const [documento, setDocumento] = useState(null);
    const [razon, setRazon] = useState('');
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFileName, setSelectedFileName] = useState('');

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get('/api/verification/status', {
                    withCredentials: true,
                });
                setEstado(res.data.data);
                console.log(res.data.data);
            } catch (err) {
                console.error('Error al obtener estado de verificación:', err);
            } finally {
                setIsLoading(false);
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
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setDocumento(e.target.files[0]);
            setSelectedFileName(e.target.files[0].name);
        }
    };

    const getProgressPercentage = () => {
        if (!estado) return 0;
        switch (estado.verificationStatus) {
            case 'approved': return 100;
            case 'pending': return 50;
            case 'rejected': return 75; 
            default: return 0;
        }
    };

    const getStepStatus = (step) => {
        if (!estado) return 'pending';

        const status = estado.verificationStatus;

        if (step === 'submitted') {
            return status !== 'none' ? 'complete' : 'pending';
        }

        if (step === 'review') {
            if (status === 'pending') return 'current';
            if (status === 'approved' || status === 'rejected') return 'complete';
            return 'pending';
        }

        if (step === 'verified') {
            if (status === 'approved') return 'complete';
            if (status === 'rejected') return 'rejected';
            return 'pending';
        }

        return 'pending';
    };

    const renderStepIcon = (step) => {
        const status = getStepStatus(step);

        if (status === 'complete') {
            return <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white"><FiCheckCircle /></div>;
        }

        if (status === 'current') {
            return <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white"><FiClock /></div>;
        }

        if (status === 'rejected') {
            return <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white"><FiXCircle /></div>;
        }

        return <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">{step === 'submitted' ? '1' : step === 'review' ? '2' : '3'}</div>;
    };

    if (isLoading) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-10">
                <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 flex flex-col items-center justify-center min-h-64">
                    <FiLoader size={40} className="text-blue-500 animate-spin mb-4" />
                    <p className="text-gray-600">Cargando información de verificación...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto grid place-items-center h-screen px-2">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h2 className="text-3xl font-bold mb-5 text-gray-900 flex items-center gap-2">
                    <FiShield className="text-blue-600" />
                    Verificación de cuenta
                </h2>

                {estado && estado.verificationStatus !== 'none' ? (
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-gray-700">
                                Estado:
                                {estado.verificationStatus === 'approved' && <span className="ml-1 text-green-600 font-medium">Verificado</span>}
                                {estado.verificationStatus === 'pending' && <span className="ml-1 text-blue-600 font-medium">En revisión</span>}
                                {estado.verificationStatus === 'rejected' && <span className="ml-1 text-red-600 font-medium">Rechazado</span>}
                            </span>
                            {estado.verificationStatus === 'approved' && <span className="bg-green-100 px-3 py-1 rounded-full text-xs text-green-800 font-semibold">Completado</span>}
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2 mb-7">
                            <div
                                className={`h-2 rounded-full ${estado.verificationStatus === 'approved'
                                        ? 'bg-green-500'
                                        : estado.verificationStatus === 'rejected'
                                            ? 'bg-red-500'
                                            : 'bg-blue-500'
                                    }`}
                                style={{ width: `${getProgressPercentage()}%` }}
                            ></div>
                        </div>

                        <div className="flex justify-between items-start mb-8">
                            <div className="flex flex-col items-center">
                                {renderStepIcon('submitted')}
                                <span className="text-xs mt-2 text-center">Solicitud enviada</span>
                            </div>

                            <div className="w-full mx-4 mt-4">
                                <div className={`h-1 ${getStepStatus('review') !== 'pending' ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                            </div>

                            <div className="flex flex-col items-center">
                                {renderStepIcon('review')}
                                <span className="text-xs mt-2 text-center">En revisión</span>
                            </div>

                            <div className="w-full mx-4 mt-4">
                                <div className={`h-1 ${getStepStatus('verified') === 'complete' ? 'bg-green-500' : getStepStatus('verified') === 'rejected' ? 'bg-red-500' : 'bg-gray-200'}`}></div>
                            </div>

                            <div className="flex flex-col items-center">
                                {renderStepIcon('verified')}
                                <span className="text-xs mt-2 text-center">Verificación</span>
                            </div>
                        </div>

                        {estado.verificationStatus === 'pending' && (
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md mb-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <FiInfo className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-blue-700">
                                            Tu solicitud está siendo revisada. Te notificaremos cuando haya una actualización.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {estado.verificationStatus === 'approved' && (
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md mb-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <FiCheckCircle className="h-5 w-5 text-green-500" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-green-700">
                                            ¡Felicidades! Tu cuenta ha sido verificada satisfactoriamente. Ahora tienes acceso a todas las funcionalidades.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {estado.verificationStatus === 'rejected' && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <FiAlertCircle className="h-5 w-5 text-red-500" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700 font-medium mb-1">
                                            Tu solicitud ha sido rechazada
                                        </p>
                                        <p className="text-sm text-red-700">
                                            Motivo: {estado.rejectionReason || "No se proporcionó un motivo específico."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {estado?.documents?.[0] && (
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6">
                                <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                                    <FiFileText className="mr-2" /> Documento enviado
                                </h3>
                                <a
                                    href={estado.documents[0]}
                                    target="_blank"
                                    className="text-blue-600 underline hover:text-blue-800 transition flex items-center gap-2"
                                >
                                    <span>Ver documento</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                    </svg>
                                </a>
                            </div>
                        )}

                        {estado.verificationStatus === 'rejected' && (
                            <div className="mt-6">
                                <button
                                    className="w-full bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
                                    onClick={() => setEstado({ ...estado, verificationStatus: 'none' })}
                                >
                                    Enviar nueva solicitud
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="py-6 rounded-xl ">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Solicitar verificación</h3>

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <FiInfo className="h-5 w-5 text-blue-500" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-blue-700">
                                    Para verificar tu cuenta, necesitamos que subas una imagen de tu documento de identidad válido. 
                                    
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Motivo de la solicitud
                                </label>
                                <textarea
                                    value={razon}
                                    onChange={(e) => setRazon(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                                    placeholder="Explica por qué deseas verificar tu cuenta"
                                    rows={2}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Documento de identidad
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition cursor-pointer">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="flex justify-center text-sm text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-gray-600">
                                                <span className='p-3'>Subir documento</span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    required
                                                />
                                            </label>
                                        </div>
                                        {selectedFileName && (
                                            <p className="text-sm text-blue-600 font-medium mt-2">
                                                {selectedFileName}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <FiLoader className="animate-spin w-5 h-5" />
                                        Enviando solicitud...
                                    </>
                                ) : (
                                    <>
                                        <FiUploadCloud className="w-5 h-5" />
                                        Enviar solicitud de verificación
                                    </>
                                )}
                            </button>

                            {mensaje && (
                                <div className={`mt-4 p-3 rounded-lg text-sm ${mensaje.startsWith('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                                    {mensaje}
                                </div>
                            )}
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}