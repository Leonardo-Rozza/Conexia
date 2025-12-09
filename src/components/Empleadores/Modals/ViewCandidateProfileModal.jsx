import { X, Mail, Briefcase, GraduationCap, MapPin, Star, Award, Building2 } from "lucide-react";

// Recibimos 'onContact' para que el botón de abajo permita saltar al modal de contacto
export default function ViewCandidateProfileModal({ isOpen, onClose, candidate, onContact }) {
  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      <div className="bg-[#f5efe7] w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* ENCABEZADO */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Perfil del Candidato</h2>
            <p className="text-sm text-gray-500 mt-1">Información detallada del perfil profesional del candidato.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-50">
            <X size={20} />
          </button>
        </div>

        {/* CUERPO (Scrollable) */}
        <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
          
          {/* 1. PERFIL PRINCIPAL */}
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-[#F3F0FA] text-[#6941C6] flex items-center justify-center text-3xl font-bold border-4 border-white shadow-sm shrink-0">
              {candidate.initials}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{candidate.name}</h3>
              <p className="text-lg text-gray-600 font-medium">{candidate.role}</p>
              
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-1 font-semibold text-gray-900">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span>{candidate.rating}/5.0</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>{candidate.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. GRID: CONTACTO Y EXPERIENCIA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contacto */}
            <div className="p-5 border border-gray-100 rounded-2xl bg-gray-50/50">
              <div className="flex items-center gap-2 mb-3 text-gray-900 font-semibold">
                <Mail size={18} className="text-gray-500" />
                <h4>Contacto</h4>
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Email</span>
                <p className="text-sm font-medium text-gray-900 mt-0.5">
                  {candidate.email || `${candidate.name.toLowerCase().replace(" ", ".")}@email.com`}
                </p>
              </div>
            </div>

            {/* Experiencia */}
            <div className="p-5 border border-gray-100 rounded-2xl bg-gray-50/50">
              <div className="flex items-center gap-2 mb-3 text-gray-900 font-semibold">
                <Briefcase size={18} className="text-gray-500" />
                <h4>Experiencia</h4>
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Años</span>
                <p className="text-sm font-medium text-gray-900 mt-0.5">
                  {candidate.experience || "Sin especificar"} de experiencia profesional
                </p>
              </div>
            </div>
          </div>

          {/* 3. EDUCACIÓN */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-900 font-semibold">
              <GraduationCap size={20} className="text-gray-500" />
              <h4>Educación</h4>
            </div>
            <div className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm">
              <p className="font-medium text-gray-900">{candidate.education}</p>
              <p className="text-sm text-gray-500 mt-1">Título Universitario / Posgrado</p>
            </div>
          </div>

          {/* 4. HABILIDADES */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-900 font-semibold">
              <Award size={20} className="text-gray-500" />
              <h4>Habilidades y Competencias</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {candidate.skills && candidate.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* 5. OFERTAS DE INTERÉS */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-900 font-semibold">
              <Building2 size={20} className="text-gray-500" />
              <h4>Ofertas de Interés</h4>
            </div>
            
            {/* Tarjeta de la oferta a la que aplicó */}
            <div className="p-4 bg-[#F3F0FA] rounded-xl border border-[#EBEAFE] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="font-semibold text-[#6941C6]">{candidate.appliedTo}</span>
              </div>
              <span className="px-2.5 py-0.5 bg-[#EBEAFE] text-[#6941C6] text-xs font-bold rounded-md">
                Aplicado
              </span>
            </div>
          </div>

        </div>

        {/* PIE DE PÁGINA */}
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 shrink-0">
          <button 
            onClick={onClose}
            className="bg-[#f1e6d8] hover:bg-[#ecd6c0] rounded-xl px-6 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
          >
            Cerrar
          </button>
          <button 
            onClick={onContact} // Al hacer click, ejecuta la función para abrir el otro modal
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-[#D3bcf6] hover:bg-[#D3bcf6]/70 text-purple-900 rounded-xl shadow-sm transition-colors"
          >
            <Mail size={16} />
            Contactar Candidato
          </button>
        </div>

      </div>
    </div>
  );
}