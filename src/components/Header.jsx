import { useState } from "react";
import logo from "../assets/logo-conexiaa.jpg";
import { LoginModal } from "../components/LoginModal"; // ajustá la ruta según tu proyecto

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [userType, setUserType] = useState("graduate");

  const handleLogin = (type) => {
    setUserType(type);
    setModalOpen(true);
  };

  return (
    <>
      <header className="bg-white/40 backdrop-blur-sm border-b border-[#d3bcf6]/50 shadow-[0_4px_8px_rgba(0,0,0,0.05)]">
        <div className="container mx-auto px-20 py-3 flex items-center justify-between">
          {/* Logo + texto Conexia */}
          <div className="flex items-center gap-1">
            <img
              src={logo}
              alt="Conexia Logo"
              className="h-24 w-24 object-contain"
            />
            <span className="text-2xl font-bold conexia-gradient leading-none">
              Conexia
            </span>
          </div>

          {/* Botón menú hamburguesa (móvil) */}
          <button
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Navegación escritorio */}
          <nav className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleLogin("graduate")}
              className="px-4 py-2 text-gray-800 font-medium rounded-md 
                         hover:bg-[#f5c16c] hover:text-gray-900 transition"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => handleLogin("graduate")}
              className="px-4 py-2 text-gray-800 font-semibold rounded-md 
                         bg-[#d3bcf6]/50 hover:bg-[#d3bcf6]/50 transition"
            >
              Registrarse
            </button>
          </nav>
        </div>

        {/* Menú móvil */}
        {menuOpen && (
          <nav className="md:hidden bg-white/70 backdrop-blur-sm border-t border-[#d3bcf6]/50">
            <div className="flex flex-col p-4 space-y-3">
              <button
                onClick={() => handleLogin("graduate")}
                className="px-4 py-2 rounded-md hover:bg-[#f5c16c] transition"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => handleLogin("graduate")}
                className="px-4 py-2 rounded-md bg-[#d3bcf6]/50 hover:bg-[#d3bcf6]/50 transition"
              >
                Registrarse
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* Solo conectamos el modal */}
      <LoginModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        userType={userType}
      />
    </>
  );
}
