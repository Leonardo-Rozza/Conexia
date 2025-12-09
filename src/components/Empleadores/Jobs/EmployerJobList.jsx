import { useState } from "react";
import { Plus } from "lucide-react";
import EmployerJobCard from "./EmployerJobCard";
import CreateJobModal from "../Modals/CreateJobModal";
import ViewJobModal from "../Modals/ViewJobModal";
import EditJobModal from "../Modals/EditJobModal";

export default function EmployerJobList() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = [
    {
      id: 1,
      title: "Desarrollador Frontend React",
      category: "Tecnología",
      department: "Tecnología",
      location: "Madrid, España",
      date: "2024-01-03",
      applicationsCount: 24,
      type: "Tiempo Completo",
      status: "Activo",
      salaryRange: "€35,000 - €45,000",
      description: "Buscamos un desarrollador Frontend apasionado por crear interfaces de usuario dinámicas...",
      requirements: "- Experiencia mínima de 3 años con React.\n- Conocimiento profundo de JavaScript."
    },
    {
      id: 2,
      title: "Product Manager",
      category: "Producto",
      department: "Producto",
      location: "Barcelona, España",
      date: "2024-01-01",
      applicationsCount: 18,
      status: "Activo",
      type: "Remoto",
      salaryRange: "€50,000 - €60,000",
      description: "Liderar la estrategia de producto...",
      requirements: "- 5 años de experiencia."
    },
    {
      id: 3,
      title: "Diseñador UX/UI",
      category: "Diseño",
      department: "Diseño",
      location: "Valencia, España",
      date: "2023-12-28",
      applicationsCount: 5,
      status: "Cerrado",
      type: "Híbrido",
      salaryRange: "€30,000 - €40,000",
      description: "Crear experiencias de usuario excepcionales...",
      requirements: "- Portafolio sólido.\n- Manejo de herramientas de diseño."
    }
  ];
  const handleViewJob = (job) => {
    setSelectedJob(job);
    setIsViewModalOpen(true);
  };

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setIsEditModalOpen(true);
  };

  const handleSwitchToEdit = () => {
    setIsViewModalOpen(false); // Cerramos el de ver
    setTimeout(() => setIsEditModalOpen(true), 100); // Abrimos el de editar (pequeño delay para suavidad)
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Ofertas Laborales
        </h1>
        
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#D3bcf6] hover:bg-[#D3bcf6]/70 text-gray-900 px-4 py-2 rounded-xl font-semibold"
        >
          <Plus size={20} />
          Nueva Oferta
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {jobs.map((job) => (
          <EmployerJobCard 
            key={job.id} 
            job={job} 
            onView={() => handleViewJob(job)}
            onEdit={() => handleEditJob(job)} 
          />
        ))}
      </div>

      {/* Modales (Viven aquí para renderizarse una sola vez) */}
      <CreateJobModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />

      <ViewJobModal 
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        job={selectedJob}
        onEdit={handleSwitchToEdit} 
      />

      <EditJobModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        job={selectedJob}
      />
    </div>
  );
}