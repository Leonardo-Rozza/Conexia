"use client";

import React from "react";

export default function LoginModal({ isOpen, onClose, onLogin, userType }) {
  if (!isOpen) return null;

  const handleFakeLogin = () => {
    // Simula un usuario sin autenticación real
    onLogin({ type: userType, name: "Usuario de prueba" });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Login - {userType}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Esta es una versión de prueba sin backend.
        </p>
        <button
          className="w-full py-2 rounded bg-[#d3bcf6] hover:bg-[#e3e6ba] text-gray-900 font-semibold transition"
          onClick={handleFakeLogin}
        >
          Ingresar
        </button>
        <button
          className="w-full py-2 mt-2 rounded border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
