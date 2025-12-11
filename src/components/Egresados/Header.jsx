import React from "react";
import { User, LogOut } from "lucide-react";
import conexiaLogo from "../../assets/logo-conexia.png"; 

export default function Header({ user = { name: "Usuario Demo", email: "demo@ejemplo.com" }, onLogout = () => {} }) {
  const userNameInitial = user.name ? user.name.charAt(0) : 'U';

  return (
    <header className="w-full bg-white p-4 sm:p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between gap-4">
        
        {/* Logo de Conexia (Tamaño aumentado) */}
        <div className="flex items-center gap-2">
            <img src={conexiaLogo} alt="Conexia Logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-purple-800 hidden sm:inline">Conexia</span>
        </div>

        {/* Información del Usuario Central */}
        <div className="flex items-center gap-3 flex-1 justify-center">
          <div className="h-10 w-10 rounded-full bg-purple-200 flex items-center justify-center text-lg font-semibold text-purple-700">
            {userNameInitial}
          </div>

          <div className="text-left">
            <h1 className="text-lg font-bold text-slate-800">¡Hola, {user.name.split(' ')[0]}!</h1>
            <p className="text-sm text-gray-500">Encuentra tu próxima oportunidad</p>
          </div>
        </div>

        {/* Botón de Cerrar Sesión (Estilo limpio) */}
        <button 
          onClick={onLogout}
          className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium transition text-gray-700 hover:bg-gray-50"
        >
          <LogOut className="h-4 w-4" />
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
}