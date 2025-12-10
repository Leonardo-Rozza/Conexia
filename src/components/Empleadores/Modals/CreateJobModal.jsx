import { X } from "lucide-react";

export default function CreateJobModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">

      <div className="bg-[#f5efe7] w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Crear Nueva Oferta Laboral</h2>
            <p className="text-sm text-gray-500 mt-1">Completa los detalles de la nueva posición que quieres publicar.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 space-y-5 max-h-[70vh] overflow-y-auto">

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Título del Puesto</label>
            <input 
              type="text" 
              placeholder="Ej: Desarrollador Full Stack" 
              className="w-full px-4 py-2.5 border bg-[#f3f3f5] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all placeholder:text-[#818080] text-gray-700"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Departamento</label>
              <input 
                type="text" 
                placeholder="Ej: Tecnología" 
                className="w-full px-4 py-2.5 border bg-[#f3f3f5] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all placeholder:text-[#818080]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Tipo</label>
              <select className="w-full px-4 py-2.5 border bg-[#f3f3f5] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 text-gray-600 cursor-pointer">
                <option>Seleccionar</option>
                <option>Tiempo Completo</option>
                <option>Medio Tiempo</option>
                <option>Remoto</option>
                <option>Híbrido</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Ubicación</label>
              <input 
                type="text" 
                placeholder="Ej: Argentina, Buenos Aires" 
                className="w-full px-4 py-2.5 border bg-[#f3f3f5] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all placeholder:text-[#818080]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Salario</label>
              <input 
                type="text" 
                placeholder="Ej: $700.000 ARS - $1.000.000 ARS" 
                className="w-full px-4 py-2.5 border bg-[#f3f3f5] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all placeholder:text-[#818080]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Descripción</label>
            <textarea 
              rows={4}
              placeholder="Describe el puesto, responsabilidades y lo que buscas..."
              className="w-full px-4 py-3 border bg-[#f3f3f5] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all placeholder:text-[#818080] resize-none"
            ></textarea>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Requisitos</label>
            <textarea 
              rows={3}
              placeholder="Lista los requisitos técnicos y experiencia necesaria..."
              className="w-full px-4 py-3 border bg-[#f3f3f5] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all placeholder:text-[#818080] resize-none"
            ></textarea>
          </div>

        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/30">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-semibold bg-[#f1e6d8] hover:bg-[#ecd6c0] text-gray-700 hover:text-gray-900 rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button className="px-6 py-2.5 text-sm font-semibold bg-[#D3bcf6] hover:bg-[#D3bcf6]/70 text-purple-900 rounded-xl shadow-sm transition-colors">
            Publicar Oferta
          </button>
        </div>

      </div>
    </div>
  );
}