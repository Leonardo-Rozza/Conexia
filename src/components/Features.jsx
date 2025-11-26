import { useState } from "react";
import { GraduationCap, Building2, School, Users, Briefcase, BookOpen } from "lucide-react";
import LoginModal from "../components/LoginModal"; // versión lista para backend

export default function Features({ onLogin }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [userType, setUserType] = useState("graduate");

  const handleOpenModal = (type) => {
    setUserType(type);
    setModalOpen(true);
  };

  const handleLogin = (userData) => {
    onLogin(userData); // notifica a App o contexto
    setModalOpen(false);
  };

  return (
    <div className="py-16 .bg-gradient-to-br from-purple-50/50 to-amber-50/50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Una Plataforma, Tres Perspectivas
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Diseñada para satisfacer las necesidades de cada usuario
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Egresados */}
          <div className="text-center border rounded-lg hover:shadow-lg transition-shadow p-6">
            <div className="w-16 h-16 bg-[#d3bcf6]/30 dark:bg-[#d3bcf6]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="h-8 w-8 text-[#d3bcf6] dark:text-[#d3bcf6]" />
            </div>
            <h3 className="text-lg font-bold mb-2">Para Egresados</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Encuentra oportunidades laborales, accede a cursos de capacitación y construye tu perfil profesional
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
              <li className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Perfil profesional completo
              </li>
              <li className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Búsqueda de empleos
              </li>
              <li className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Cursos de capacitación
              </li>
            </ul>
            <button
              className="w-full py-2 rounded bg-[#d3bcf6] hover:bg-[#e3e6ba] text-gray-900 font-semibold transition"
              onClick={() => handleOpenModal("graduate")}
            >
              Registrarme como Egresado
            </button>
          </div>

          {/* Empleadores */}
          <div className="text-center border rounded-lg hover:shadow-lg transition-shadow p-6">
            <div className="w-16 h-16 bg-[#d3bcf6]/30 dark:bg-[#d3bcf6]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-8 w-8 text-[#d3bcf6] dark:text-[#d3bcf6]" />
            </div>
            <h3 className="text-lg font-bold mb-2">Para Empleadores</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Publica ofertas laborales, encuentra talento calificado y gestiona tu proceso de reclutamiento
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
              <li className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Publicar ofertas laborales
              </li>
              <li className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Buscar candidatos
              </li>
              <li className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Gestionar aplicaciones
              </li>
            </ul>
            <button
              className="w-full py-2 rounded bg-[#d3bcf6] hover:bg-[#e3e6ba] text-gray-900 font-semibold transition"
              onClick={() => handleOpenModal("employer")}
            >
              Registrarme como Empleador
            </button>
          </div>

          {/* Instituciones */}
          <div className="text-center border rounded-lg hover:shadow-lg transition-shadow p-6">
            <div className="w-16 h-16 bg-[#d3bcf6]/30 dark:bg-[#d3bcf6]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <School className="h-8 w-8 text-[#d3bcf6] dark:text-[#d3bcf6]" />
            </div>
            <h3 className="text-lg font-bold mb-2">Para Instituciones</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Realiza seguimiento de tus egresados y mide el impacto de tu formación académica
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
              <li className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Seguimiento de egresados
              </li>
              <li className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Estadísticas de empleabilidad
              </li>
              <li className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Programas de actualización
              </li>
            </ul>
            <button
              className="w-full py-2 rounded bg-[#d3bcf6] hover:bg-[#e3e6ba] text-gray-900 font-semibold transition"
              onClick={() => handleOpenModal("institution")}
            >
              Registrarme como Institución
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onLogin={handleLogin}
        userType={userType}
      />
    </div>
  );
}
