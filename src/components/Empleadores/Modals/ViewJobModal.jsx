import { X, Users, Pencil, Building2, MapPin, Calendar, Banknote, Clock } from "lucide-react";

export default function ViewJobModal({ isOpen, onClose, job, onEdit }) {
  // Si el modal no está abierto o no hay un trabajo seleccionado, no renderizamos nada.
  if (!isOpen || !job) return null;

  // Desestructuramos los datos del trabajo con valores por defecto
  const {title, department, type, location, salaryRange, date, applicationsCount, status, description, requirements} = job;

  // Lógica para el estilo del badge de estado (igual que en tus tarjetas)
  const isActive = status === "Activo";
  const statusBadgeStyles = isActive
    ? "bg-[#EBEAFE] text-[#6941C6]" // Estilo Conexia Activo
    : "bg-gray-100 text-gray-600"; // Estilo Cerrado/Borrador

  return (
    // Overlay oscuro con efecto de desenfoque
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      {/* Contenedor Principal del Modal */}
      <div className="bg-[#f5efe7] w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        
        {/* --- ENCABEZADO --- */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Detalles de la Oferta Laboral</h2>
            <p className="text-sm text-gray-500 mt-1">Información completa de la posición seleccionada.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* --- CUERPO CON SCROLL --- */}
        <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar flex-1">
          
          {/* Sección 1: Detalles Principales (Grid de 2 columnas) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Título */}
            <DetailField label="Título del Puesto" value={title} icon={BriefcaseIcon} />
            {/* Departamento */}
            <DetailField label="Departamento" value={department} icon={Building2} />
            
            {/* Tipo de Empleo */}
            <DetailField label="Tipo de Empleo" value={type} icon={Clock} />
            {/* Ubicación */}
            <DetailField label="Ubicación" value={location} icon={MapPin} />
            
            {/* Rango Salarial */}
            <DetailField label="Rango Salarial" value={salaryRange} icon={Banknote} />
            {/* Fecha de Publicación */}
            <DetailField label="Fecha de Publicación" value={date} icon={Calendar} />

            {/* Aplicaciones Recibidas (Estilo Destacado) */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Aplicaciones Recibidas</label>
              <div className="flex items-center gap-2 p-3 bg-[#F3F0FA] rounded-xl border border-[#EBEAFE] text-[#6941C6]">
                <Users size={18} />
                <span className="text-sm font-bold">{applicationsCount} candidatos</span>
              </div>
            </div>

            {/* Estado */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Estado</label>
              <div className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-100 h-[46px]">
                <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${statusBadgeStyles}`}>
                  {status}
                </span>
              </div>
            </div>

          </div>

          {/* Sección 2: Descripción y Requisitos (Texto Completo) */}
          <div className="space-y-6 border-t border-gray-100 pt-6">
            
            {/* Descripción */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-gray-900">Descripción del Puesto</h3>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {description}
              </div>
            </div>

            {/* Requisitos */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-gray-900">Requisitos</h3>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {requirements}
              </div>
            </div>

          </div>

        </div>

        {/* --- PIE DE PÁGINA (Footer) --- */}
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 bg-[#f1e6d8] hover:bg-[#ecd6c0] rounded-xl transition-colors"
          >
            Cerrar
          </button>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-[#D3bcf6] hover:bg-[#D3bcf6]/70 text-purple-900 rounded-xl shadow-sm transition-colors"
          >
            <Pencil size={16} />
            Editar Oferta
          </button>
        </div>

      </div>
    </div>
  );
}

// Componente auxiliar para los campos de detalle normales
// Esto ayuda a mantener el código principal más limpio
function DetailField({ label, value, icon: Icon }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-900">
        {Icon && <Icon size={18} className="text-gray-400 shrink-0" />}
        <span className="text-sm font-medium truncate">{value}</span>
      </div>
    </div>
  );
}

// Icono simple para el título si no quieres importar uno específico
const BriefcaseIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);