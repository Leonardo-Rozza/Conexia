import { Search, SlidersHorizontal, X } from "lucide-react";
import CandidateCard from "./CandidateCard";
import { useState } from "react";
import FilterCandidatesModal from "../Modals/FilterCandidatesModal";
import ContactCandidateModal from "../Modals/ContactCandidateModal";
import ViewCandidateProfileModal from "../Modals/ViewCandidateProfileModal";

export default function CandidateList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isViewProfileModalOpen, setIsViewProfileModalOpen] = useState(false);

  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleViewProfile = (candidate) => {
    setSelectedCandidate(candidate);
    setIsViewProfileModalOpen(true);
  };

  const handleSwitchToContact = () => {
    setIsViewProfileModalOpen(false); // Cerramos perfil
    setTimeout(() => setIsContactModalOpen(true), 100); // Abrimos contacto
  };

  const [activeFilters, setActiveFilters] = useState({
    location: "",
    experience: "",
    skills: "",
    rating: ""
  });

  const candidates = [
    {
      id: 1,
      initials: "AG",
      name: "Ana García",
      role: "Desarrolladora Frontend",
      rating: 4.8,
      education: "Ingeniería Informática - Universidad Politécnica",
      location: "Madrid, España",
      experienceYears: 3,
      experience: "Experiencia: 3 años",
      skills: ["React", "TypeScript", "CSS", "Node.js"],
      appliedTo: "Desarrollador Frontend React"
    },
    {
      id: 2,
      initials: "CR",
      name: "Carlos Rodríguez",
      role: "Product Manager",
      rating: 4.9,
      education: "MBA - ESADE Business School",
      location: "Barcelona, España",
      experienceYears: 5,
      experience: "Experiencia: 5 años",
      skills: ["Product Strategy", "Agile", "Analytics", "UX Research"],
      appliedTo: "Product Manager"
    },
    {
      id: 3,
      initials: "ML",
      name: "María López",
      role: "Diseñadora UX/UI",
      rating: 4.7,
      education: "Diseño Gráfico - Universidad de Bellas Artes",
      location: "Valencia, España",
      experienceYears: 4,
      experience: "Experiencia: 4 años",
      skills: ["Figma", "Adobe XD", "Prototyping", "Wireframing"],
      appliedTo: "Diseñador UX/UI"
    },
    {
      id: 4,
      initials: "DM",
      name: "David Martín",
      role: "Analista de Datos",
      rating: 4.6,
      education: "Matemáticas - Universidad Complutense",
      location: "Madrid, España",
      experienceYears: 2,
      experience: "Experiencia: 2 años",
      skills: ["Python", "SQL", "Tableau", "Power BI"],
      appliedTo: "Analista de Datos"
    }
  ];

  const handleApplyFilters = (newFilters) => {
    setActiveFilters(newFilters);
  };

  const clearFilters = () => {
    setActiveFilters({ location: "", experience: "", skills: "", rating: "" });
  };

  const filteredCandidates = candidates.filter((candidate) => {
    // A. Filtro por Buscador de Texto (Lupa)
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      candidate.name.toLowerCase().includes(term) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(term));

    if (!matchesSearch) return false;

    // B. Filtros Avanzados (Modal)
    
    // Filtro Ubicación
    if (activeFilters.location && !candidate.location.toLowerCase().includes(activeFilters.location.toLowerCase())) {
      return false;
    }

    // Filtro Experiencia (Lógica simple: mayor o igual a lo seleccionado)
    if (activeFilters.experience) {
      const minYears = parseInt(activeFilters.experience);
      // Asumimos que tienes un campo experienceYears o parseas el string
      // Aquí uso experienceYears que agregué al mock data, o una lógica simple:
      if (candidate.experienceYears < minYears) return false;
    }

    // Filtro Rating
    if (activeFilters.rating) {
      if (candidate.rating < parseFloat(activeFilters.rating)) return false;
    }

    // Filtro Habilidades (Si escribieron "React", debe tener React)
    if (activeFilters.skills) {
      const requiredSkills = activeFilters.skills.split(",").map(s => s.trim().toLowerCase());
      // Verifica si tiene AL MENOS UNA de las skills requeridas
      const hasSkill = requiredSkills.some(reqSkill => 
        candidate.skills.some(candSkill => candSkill.toLowerCase().includes(reqSkill))
      );
      if (!hasSkill) return false;
    }

    return true;
  });

  // Verificamos si hay algún filtro activo para cambiar el color del botón
  const hasActiveFilters = Object.values(activeFilters).some(val => val !== "");

  const handleContactCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    setIsContactModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Buscar candidatos por nombre, habilidades..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition-all placeholder:text-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className={`flex items-center gap-2 px-4 py-2.5 bg-[#f1e6d8] border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-[#ecd6c0] transition-colors 
          ${hasActiveFilters
            ? 'bg-[#D4C7F5] text-purple-900 border-transparent hover:bg-[#c4b3f0]'
            : 'bg-[#f1e6d8] border-gray-200 text-gray-700 hover:bg-[#ecd6c0]'
          }`}
        >
          <SlidersHorizontal size={18} />
          Filtros
          {hasActiveFilters && <span className="w-2 h-2 bg-purple-600 rounded-full ml-1"></span>}
        </button>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="p-2.5 text-gray-400 hover:text-red-500 transition-colors bg-white border border-gray-200 rounded-xl" title="Borrar filtros">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCandidates.length > 0 ? (
          filteredCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onContact={() => handleContactCandidate(candidate)}
              onViewProfile={() => handleViewProfile(candidate)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            No se encontraron candidatos que coincidan con tu búsqueda.
          </div>
        )}
      </div>

      <FilterCandidatesModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)} 
        onApplyFilters={handleApplyFilters} // <-- Pasamos la función aquí
      />

      <ContactCandidateModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        candidate={selectedCandidate}
      />

      <ViewCandidateProfileModal
        isOpen={isViewProfileModalOpen}
        onClose={() => setIsViewProfileModalOpen(false)}
        candidate={selectedCandidate}
        onContact={handleSwitchToContact} // Conectamos el botón del modal
      />
      
    </div>
  );
}