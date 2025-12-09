import { Building2, MapPin, Calendar, Eye, Pencil } from "lucide-react";

export default function EmployerJobCard({ job, onView, onEdit }) {
  const { title, category, location, date, applicationsCount, status } = job;

  const isActive = status === "Activo";

  const statusStyles = isActive 
    ? "bg-purple-100 text-purple-700 border-transparent" 
    : "bg-gray-100 text-gray-600 border-transparent";

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-200 flex flex-col gap-4">

      <div className="flex items-start justify-between gap-4">
        <h3 className="text-[17px] font-bold text-gray-900 truncate tracking-tight">
          {title}
        </h3>
        <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${statusStyles}`}>
          {status}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
        <div className="flex items-center gap-1.5">
          <Building2 size={15} className="text-gray-400" />
          <span>{category}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin size={15} className="text-gray-400" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar size={15} className="text-gray-400" />
          <span>{date}</span>
        </div>
      </div>

      <div className="flex items-end justify-between mt-2">

        <div className="flex flex-col">
          <span className="text-[11px] text-gray-400 font-medium mb-0.5">
            Aplicaciones recibidas
          </span>
          <span className="text-3xl font-bold text-[#2563EB] leading-none">
            {applicationsCount}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onView} 
            className="flex items-center justify-center gap-2 px-5 py-2 bg-[#f1e6d8] hover:bg-[#ecd6c0] border border-gray-100 text-gray-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <Eye size={16} />
            Ver
          </button>
          <button
            onClick={onEdit}
            className="flex items-center justify-center gap-2 px-5 py-2 bg-[#f1e6d8] hover:bg-[#ecd6c0] border border-gray-100 text-gray-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <Pencil size={16} />
            Editar
          </button>
        </div>

      </div>
    </div>
  );
}