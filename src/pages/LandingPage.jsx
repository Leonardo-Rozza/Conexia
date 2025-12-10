
import React, { useState } from "react";
import Header from "../components/Header";
import HeroMain from "../components/HeroMain";
import Features from "../components/Features";
import Stats from "../components/Stats";
import LoginModal from "../components/LoginModal";



export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función que se ejecuta al hacer login o registro
  const handleLogin = (user) => {
    console.log("Usuario logueado:", user);
    // Aquí más adelante podrías guardar el usuario en contexto o estado global
  };

  return (
    <>
      <Header />
      <HeroMain />
      <Features />
      <Stats />

      {/* Botón para abrir modal */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-300 hover:bg-purple-400 text-white px-4 py-2 rounded"
        >
          Iniciar / Registrarse
        </button>
      </div>

      {/* Modal */}
      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={handleLogin}
        userType="graduate" // Cambiar según tipo de usuario: "graduate", "employer", "institution"
      />

        

    </>
  );
}
