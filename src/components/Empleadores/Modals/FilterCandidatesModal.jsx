import { X, Filter, MapPin, Briefcase, Star, Code } from "lucide-react";
import { useState } from "react";

export default function FilterCandidatesModal({ isOpen, onClose, onApplyFilters }) {
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [rating, setRating] = useState("");

  const handleClean = () => {
    setLocation("");
    setExperience("");
    setSkills("");
    setRating("");
    onApplyFilters({}); 
  };

  const handleApply = () => {
    // Enviamos un objeto con los filtros al componente padre
    onApplyFilters({
      location,
      experience,
      skills,
      rating
    });
    onClose(); // Cerramos el modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      <div className="bg-[#f5efe7] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* ENCABEZADO */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Filtrar Candidatos</h2>
            <p className="text-sm text-gray-500 mt-1">Aplica filtros para encontrar candidatos específicos.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-50">
            <X size={20} />
          </button>
        </div>

        {/* CUERPO DEL FORMULARIO */}
        <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
          
          {/* Ubicación */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Ubicación</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Ej: Madrid, Barcelona..." 
                className="bg-[#f3f3f5] text-gray-700 w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition-all text-sm"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* Años de Experiencia */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Años de Experiencia</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-2.5 text-gray-400" size={16} />
              <select 
                className="bg-[#f3f3f5] w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300 text-gray-700 text-sm appearance-none cursor-pointer"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="">Cualquier cantidad de experiencia</option>
                <option value="0">0 - 1 años</option>
                <option value="1">1 - 3 años</option>
                <option value="3">3 - 5 años</option>
                <option value="5">+5 años</option>
              </select>
            </div>
          </div>

          {/* Habilidades */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Habilidades</label>
            <div className="relative">
              <Code className="absolute left-3 top-2.5 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Ej: React, Python..." 
                className="bg-[#f3f3f5] text-gray-700 w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition-all text-sm"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-400 pl-1">Separa con comas (Ej: React, CSS)</p>
          </div>

          {/* Calificación Mínima */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Calificación Mínima</label>
            <div className="relative">
              <Star className="absolute left-3 top-2.5 text-gray-400" size={16} />
              <select 
                className="bg-[#f3f3f5] text-gray-700 w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300 text-sm appearance-none cursor-pointer"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="">Cualquier calificación</option>
                <option value="3">3+ Estrellas</option>
                <option value="3.5">3.5+ Estrellas</option>
                <option value="4">4+ Estrellas</option>
                <option value="4.5">4.5+ Estrellas</option>
                <option value="5">5 Estrellas</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-[#F3F0FA] rounded-xl border border-[#EBEAFE] flex gap-3 items-start">
            <Filter className="text-[#6941C6] mt-0.5 shrink-0" size={18} />
            <p className="text-xs text-[#6941C6] leading-relaxed font-medium">
              Estos filtros se sumarán a tu búsqueda actual.
            </p>
          </div>

        </div>

        {/* PIE DE PÁGINA */}
        <div className="p-5 border-t border-gray-100 flex items-center justify-between bg-gray-50/50 shrink-0">
          
          <button 
            onClick={handleClean} // Conectamos la función limpiar
            className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
          >
            <X size={14} /> Limpiar
          </button>

          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-[#f1e6d8] hover:bg-[#ecd6c0] rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={handleApply} // Conectamos la función aplicar
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[#D3bcf6] hover:bg-[#D3bcf6]/70 text-purple-900 rounded-lg shadow-sm transition-colors"
            >
              <Filter size={16} />
              Aplicar Filtros
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}