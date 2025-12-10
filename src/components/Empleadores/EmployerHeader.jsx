import { Briefcase, LogOut } from "lucide-react";
import logo from "../../assets/logo-conexia.png";

export default function EmployerHeader() {
  return (
    <header className="bg-white/30 backdrop-blur-sm border-b border-purple-200/50 shadow-[0_4px_8px_rgba(0,0,0,0.05)]">
      <div className="container mx-auto px-20 py-3 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Conexia Logo"
            className="h-24 w-24 object-contain"
          />

          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold conexia-gradient leading-none">
              Conexia
            </span>

            <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />

            <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-semibold">
              U
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-semibold">
                ¡Hola, Usuario Demo!
              </span>
              <span className="text-sm text-gray-500">
                Gestiona tus ofertas y encuentra talento
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center font-medium gap-2 px-4 py-2 rounded-md bg-[#f1e6d8] text-gray-800 hover:bg-[#ecd6c0]">
            <LogOut size={18} className="text-gray-700" />
            <span className="text-sm">Cerrar Sesión</span>
          </button>
        </div>

      </div>
    </header>
  );
}