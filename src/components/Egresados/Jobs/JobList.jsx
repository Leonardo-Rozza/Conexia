import React, { useState } from "react";
import JobCard from "./JobCard.jsx";
import Filters from "./Filters.jsx"; 
import { Search } from "lucide-react";

export default function JobList({ jobs = [], applied = [], onApply = () => {}, searchTerm, setSearchTerm }) {
  const [showFilters, setShowFilters] = useState(false);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="space-y-6">
      
      {/* Barra de Búsqueda y Filtros */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar empleos..." 
            value={searchTerm}
            onChange={handleSearchChange}
            // CLASES AJUSTADAS: Reducimos el padding vertical (py-2) y usamos rounded-full o rounded-xl para el estilo elegante.
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm"
          />
        </div>
        <button 
            onClick={() => setShowFilters(true)}
            // CLASES AJUSTADAS: Reducimos padding vertical (py-2) para hacerlo más delgado.
            className="px-4 py-2 text-sm font-medium rounded-xl text-purple-800 bg-purple-100 hover:bg-purple-200 transition shadow-sm"
        >
          Filtros
        </button>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center text-gray-500 p-8 bg-white rounded-xl shadow-md">
          No se encontraron empleos disponibles.
        </div>
      ) : (
        <div className="grid gap-4"> 
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} isApplied={applied.includes(job.id)} onApply={onApply} />
          ))}
        </div>
      )}

      <Filters isOpen={showFilters} onClose={() => setShowFilters(false)} />
    </div>
  );
}