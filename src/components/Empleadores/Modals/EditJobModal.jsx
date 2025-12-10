import { X } from "lucide-react";

export default function EditJobModal({ isOpen, onClose, job }) {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      <div className="bg-[#f5efe7] w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* ENCABEZADO */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Editar Oferta Laboral</h2>
            <p className="text-sm text-gray-500 mt-1">Modifica los detalles de la oferta laboral seleccionada.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* FORMULARIO CON DATOS PRECARGADOS (defaultValue) */}
        <div className="p-8 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
          
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Título del Puesto</label>
            <input 
              type="text" 
              defaultValue={job.title} 
              className="bg-[#f3f3f5] w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all text-gray-700"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Departamento</label>
              <input type="text" defaultValue={job.department} className="bg-[#f3f3f5] w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Tipo de Empleo</label>
              <select defaultValue={job.type} className="bg-[#f3f3f5] w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 text-gray-700">
                <option value="Tiempo Completo">Tiempo Completo</option>
                <option value="Medio Tiempo">Medio Tiempo</option>
                <option value="Remoto">Remoto</option>
                <option value="Híbrido">Híbrido</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Ubicación</label>
              <input type="text" defaultValue={job.location} className="bg-[#f3f3f5] w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Rango Salarial</label>
              <input type="text" defaultValue={job.salaryRange} className="bg-[#f3f3f5] w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Descripción del Puesto</label>
            <textarea rows={4} defaultValue={job.description} className="bg-[#f3f3f5] w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all resize-none"></textarea>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Requisitos</label>
            <textarea rows={3} defaultValue={job.requirements} className="bg-[#f3f3f5] w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all resize-none"></textarea>
          </div>

        </div>

        {/* PIE DE PÁGINA */}
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/30">
          <button onClick={onClose} className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-[#f1e6d8] hover:bg-[#ecd6c0] text-gray-700 hover:text-gray-900 transition-colors">
            Cancelar
          </button>
          <button className="px-6 py-2.5 text-sm font-semibold bg-[#D3bcf6] hover:bg-[#D3bcf6]/70 text-purple-900 rounded-xl shadow-sm transition-colors">
            Guardar Cambios
          </button>
        </div>

      </div>
    </div>
  );
}