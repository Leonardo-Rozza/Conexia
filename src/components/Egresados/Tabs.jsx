import React from "react";
import { Briefcase, BookOpen, Users, User } from "lucide-react";

export default function Tabs({ tab, setTab }) {
  const buttons = [
    { id: "empleos", label: "Empleos", icon: Briefcase },
    { id: "cursos", label: "Cursos", icon: BookOpen },
    { id: "aplicaciones", label: "Mis Aplicaciones", icon: Users },
    { id: "perfil", label: "Perfil", icon: User },
  ];

  // CLASES BASE: Reducimos la altura vertical (py-2) para hacerlo más delgado
  const baseClasses = "flex-1 min-w-[100px] sm:min-w-0 py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 transition duration-300 rounded-xl";
  
  // CLASE ACTIVA (Fondo púrpura SATURADO y texto púrpura oscuro)
  // Utilizamos los colores finales que identificamos.
  const activeClasses = "text-[#2D1B4E] bg-[#A0A0D3] shadow-sm"; 
  
  // CLASE INACTIVA 
  const inactiveClasses = "text-purple-800 hover:bg-purple-200/50";

  return (
    // CAMBIO CLAVE: Eliminamos `max-w-6xl mx-auto` y `mt-6` que aplicamos antes.
    // Ahora, el contenedor principal de Egresados se encarga del ancho.
    <div className="w-full"> 
      {/* Contenedor: Fondo púrpura pálido y padding muy pequeño (p-1.5) */}
      <div className="bg-[#F3E8FF] rounded-xl p-1.5 flex overflow-x-auto space-x-1 shadow-md">
        {buttons.map((b) => (
          <button
            key={b.id}
            onClick={() => setTab(b.id)}
            className={`${baseClasses} ${tab === b.id ? activeClasses : inactiveClasses}`}
          >
            <b.icon className="h-4 w-4" />
            <span>{b.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}