import { useState } from "react";
import { GraduationCap, Building2, School, ArrowRight } from "lucide-react";
import LoginModal from "./LoginModal"; // versión de prueba sin autenticación

export default function HeroMain({ onLogin, isMobile }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userType, setUserType] = useState("graduate");

  const handleOpenModal = (type) => {
    setUserType(type);
    setIsModalOpen(true);
  };

  const handleLogin = (userData) => {
    // Simula login exitoso para desarrollo
    console.log("Usuario logueado:", userData || { name: "Usuario de prueba", type: userType });
    onLogin(userData || { name: "Usuario de prueba", type: userType });
    setIsModalOpen(false);
  };

  return (
    <div className="relative overflow-hidden bg-linear-to-b from-purple-100 to-amber-50">
      <div className="container mx-auto px-4 py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl lg:text-6xl'} font-bold text-gray-900`}>
                Conecta Tu <span className="text-purple-400">Futuro</span> Profesional
              </h1>
              <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600`}>
                La plataforma que une egresados, empleadores e instituciones educativas para crear oportunidades laborales exitosas.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white bg-purple-400 hover:bg-orange-300 transition ${isMobile ? 'text-base' : 'text-lg'}`}
                onClick={() => handleOpenModal('graduate')}
              >
                <GraduationCap className="h-5 w-5" />
                Soy Egresado
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-gray-300 text-gray-800 hover:bg-gray-100 transition ${isMobile ? 'text-base' : 'text-lg'}`}
                onClick={() => handleOpenModal('employer')}
              >
                <Building2 className="h-5 w-5" />
                Soy Empleador
              </button>

              <button
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-gray-300 text-gray-800 hover:bg-gray-100 transition ${isMobile ? 'text-base' : 'text-lg'}`}
                onClick={() => handleOpenModal('institution')}
              >
                <School className="h-5 w-5" />
                Soy Institución
              </button>
            </div>
          </div>

          <div className="relative order-first lg:order-last">
            <img
              src="https://images.unsplash.com/photo-1659080907111-7c726e435a28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBuZXR3b3JraW5nJTIwZ3JhZHVhdGlvbnxlbnwxfHx8fDE3NTk2OTI2NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Profesionales conectándose"
              className={`w-full ${isMobile ? 'h-48' : 'h-80 lg:h-96'} object-cover rounded-lg shadow-2xl`}
            />
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={handleLogin}
        userType={userType}
      />
    </div>
  );
}
