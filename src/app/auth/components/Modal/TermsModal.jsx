// src/components/TermsModal.jsx
import React, { useState } from 'react';

const TermsModal = ({ showModal, onClose, onAccept }) => {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleAccept = () => {
    if (!termsAccepted) {
      alert('Debes aceptar los términos y condiciones.');
      return;
    }
    onAccept();
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <h3 className="text-xl font-semibold mb-4">Confirmación</h3>
        <p className="mb-4">¿Estás seguro de que deseas registrarte?</p>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
            className="mr-2"
          />
          <label>Acepto los términos y condiciones</label>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleAccept}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Sí
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
