import { useState } from "react";
import { GraduationCap, Building2, School, Users, Briefcase, BookOpen } from "lucide-react";
import { LoginModal } from "../components/LoginModal";

export default function Features() {
  const [modalOpen, setModalOpen] = useState(false);
  const [userType, setUserType] = useState("graduate");

  const handleOpenModal = (type) => {
    setUserType(type);
    setModalOpen(true);
  };

  const handleLogin = (userData) => {
    setModalOpen(false);
    // Redirigir a instituciones
    window.location.href = "/instituciones";
  };

  return (
    <div className="py-16 .bg-gradient-to-br from-purple-50/50 to-amber-50/50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* ...resto del código tal cual lo pasaste... */}
        {/* Botón de modal ya llama handleOpenModal correctamente */}
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
