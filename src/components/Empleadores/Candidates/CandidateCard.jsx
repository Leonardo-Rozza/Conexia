import { MapPin, GraduationCap, Briefcase, Star, Mail, Eye } from "lucide-react";

export default function CandidateCard({ candidate, onContact, onViewProfile }) {
  // Valores por defecto para evitar errores si faltan datos
  const { name, role, rating, education, location, experience, skills, appliedTo, initials } = candidate;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full">
      
      {/* 1. HEADER: Avatar + Info Principal */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar Circular con Iniciales */}
        <div className="h-12 w-12 rounded-full bg-[#F3F0FA] text-[#6941C6] flex items-center justify-center text-lg font-bold shrink-0">
          {initials}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 truncate">{name}</h3>
          </div>
          <p className="text-sm text-gray-600 font-medium">{role}</p>
          
          {/* Rating de estrellas */}
          <div className="flex items-center gap-1 mt-1">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-semibold text-gray-700">{rating}</span>
          </div>
        </div>
      </div>

      {/* 2. DETALLES: Educación, Ubicación, Experiencia */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <GraduationCap size={16} className="text-gray-400 shrink-0" />
          <span className="truncate">{education}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin size={16} className="text-gray-400 shrink-0" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Briefcase size={16} className="text-gray-400 shrink-0" />
          <span>{experience}</span>
        </div>
      </div>

      {/* 3. SKILLS (Habilidades) */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-900 mb-2">Habilidades</p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span 
              key={index} 
              className="px-2 py-1 rounded-md bg-gray-50 text-gray-600 text-xs font-medium border border-gray-100"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-50">
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 mb-1">Aplicó a:</p>
          <span className="inline-block px-3 py-1 rounded-md bg-purple-100 text-purple-700 text-xs font-semibold">
            {appliedTo}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onContact}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#D3bcf6] hover:bg-[#D3bcf6]/70 text-purple-900 rounded-xl text-sm font-semibold transition-colors">
            <Mail size={16} />
            Contactar
          </button>
          <button
            onClick={onViewProfile}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#f1e6d8] hover:bg-[#ecd6c0] border border-gray-100 text-gray-700 rounded-xl text-sm font-medium transition-colors"
          >
            <Eye size={16} />
            Ver Perfil
          </button>
        </div>
      </div>

    </div>
  );
}