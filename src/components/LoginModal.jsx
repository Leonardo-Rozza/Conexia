import React, { useState } from "react";
import { GraduationCap, Building2, School } from "lucide-react";
import logoConexia from "../assets/logo-conexiaa.jpg";
import { useNavigate } from "react-router-dom";

export function LoginModal({ isOpen, onClose, onLogin, userType }) {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    position: "",
    institution: ""
  });

  const navigate = useNavigate();

  if (!isOpen) return null;

  const getUserTypeConfig = () => {
    switch (userType) {
      case "graduate":
        return { icon: GraduationCap, title: "Egresado", description: "Accede a oportunidades laborales y cursos" };
      case "employer":
        return { icon: Building2, title: "Empleador", description: "Encuentra talento y publica ofertas laborales" };
      case "institution":
        return { icon: School, title: "Institución Educativa", description: "Realiza seguimiento de tus egresados" };
      default:
        return { icon: null, title: "", description: "" };
    }
  };

  const config = getUserTypeConfig();
  const IconComponent = config.icon;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simula login/registro exitoso sin backend
    const simulatedUser = {
      name: formData.name || "Usuario de prueba",
      email: formData.email || "test@conexia.com",
      type: userType,
    };

    onLogin(simulatedUser);

    // Redirigir según tipo de usuario
    switch (userType) {
      case "graduate":
        navigate("/Egresados");
        break;
      case "employer":
        navigate("/Empleadores");
        break;
      case "institution":
        navigate("/Instituciones");
        break;
      default:
        navigate("/");
    }

    // Limpiar formulario y cerrar modal
    setFormData({ name: "", email: "", password: "", company: "", position: "", institution: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <img src={logoConexia} alt="Conexia" className="h-12 w-12" />
          <span className="text-2xl font-bold conexia-gradient">Conexia</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#d3bcf6]/30 dark:bg-[#d3bcf6]/20 rounded-full flex items-center justify-center">
            {IconComponent && <IconComponent className="h-5 w-5 text-[#d3bcf6] dark:text-[#d3bcf6]" />}
          </div>
          <div>
            <h2 className="text-lg font-bold">{config.title}</h2>
            <p className="text-sm text-gray-500">{config.description}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mb-4 gap-2">
          <button
            className={`flex-1 py-2 text-center transition
              ${activeTab === "login"
                ? "bg-[#d3bcf6]/50 rounded-full font-semibold text-gray-900 border border-[#b0a0e0]"
                : "bg-transparent text-gray-700 hover:bg-[#d3bcf6]/20 rounded-full border border-transparent"}`}
            onClick={() => setActiveTab("login")}
          >
            Iniciar Sesión
          </button>

          <button
            className={`flex-1 py-2 text-center transition
              ${activeTab === "register"
                ? "bg-[#d3bcf6]/50 rounded-full font-semibold text-gray-900 border border-[#b0a0e0]"
                : "bg-transparent text-gray-700 hover:bg-[#d3bcf6]/20 rounded-full border border-transparent"}`}
            onClick={() => setActiveTab("register")}
          >
            Registrarse
          </button>
        </div>

        {/* Formularios */}
        {activeTab === "login" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Correo Electrónico</label>
              <input
                type="email"
                className="w-full border px-3 py-2 rounded"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={e => handleInputChange("email", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Contraseña</label>
              <input
                type="password"
                className="w-full border px-3 py-2 rounded"
                placeholder="••••••••"
                value={formData.password}
                onChange={e => handleInputChange("password", e.target.value)}
              />
            </div>
            <button type="submit" className="w-full bg-[#d3bcf6] hover:bg-[#e3e6ba] text-gray-900 py-2 rounded-full transition border border-[#b0a0e0]">
              Iniciar Sesión
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Nombre Completo</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                placeholder="Tu nombre completo"
                value={formData.name}
                onChange={e => handleInputChange("name", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Correo Electrónico</label>
              <input
                type="email"
                className="w-full border px-3 py-2 rounded"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={e => handleInputChange("email", e.target.value)}
              />
            </div>

            {userType === "employer" && (
              <>
                <div>
                  <label className="block text-sm mb-1">Empresa</label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Nombre de tu empresa"
                    value={formData.company}
                    onChange={e => handleInputChange("company", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Cargo</label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Tu cargo en la empresa"
                    value={formData.position}
                    onChange={e => handleInputChange("position", e.target.value)}
                  />
                </div>
              </>
            )}

            {userType === "institution" && (
              <div>
                <label className="block text-sm mb-1">Institución</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Nombre de la institución"
                  value={formData.institution}
                  onChange={e => handleInputChange("institution", e.target.value)}
                />
              </div>
            )}

            <div>
              <label className="block text-sm mb-1">Contraseña</label>
              <input
                type="password"
                className="w-full border px-3 py-2 rounded"
                placeholder="••••••••"
                value={formData.password}
                onChange={e => handleInputChange("password", e.target.value)}
              />
            </div>

            <button type="submit" className="w-full bg-[#d3bcf6] hover:bg-[#e3e6ba] text-gray-900 py-2 rounded-full transition border border-[#b0a0e0]">
              Crear Cuenta
            </button>
          </form>
        )}

        {/* Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default LoginModal;


