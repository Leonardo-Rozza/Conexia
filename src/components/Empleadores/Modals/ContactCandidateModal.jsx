import { X, Mail, Lightbulb, Send } from "lucide-react";

export default function ContactCandidateModal({ isOpen, onClose, candidate }) {
  // Si no está abierto o no hay candidato seleccionado, no mostramos nada
  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      <div className="bg-[#f5efe7] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* ENCABEZADO */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Contactar a {candidate.name.split(" ")[0]}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Envía un mensaje personalizado al candidato para iniciar el proceso.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* CUERPO DEL MODAL */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          
          {/* Tarjeta de Resumen del Candidato */}
          <div className="flex items-center gap-4 p-4 bg-[#F3F0FA] rounded-xl border border-[#EBEAFE]">
            <div className="h-12 w-12 rounded-full bg-white text-[#6941C6] flex items-center justify-center text-lg font-bold shadow-sm shrink-0">
              {candidate.initials}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{candidate.name}</h3>
              <div className="flex flex-col sm:flex-row sm:gap-4 text-xs text-gray-500 mt-0.5">
                <span>{candidate.role}</span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                   <Mail size={12} />
                   {/* Generamos un email ficticio si no existe en los datos */}
                   {candidate.email || `${candidate.name.toLowerCase().replace(" ", ".")}@email.com`}
                </span>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="space-y-4">
            
            {/* Asunto */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Asunto</label>
              <input 
                type="text" 
                defaultValue="Oportunidad laboral"
                className="bg-[#f3f3f5] w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition-all text-sm text-gray-700"
              />
            </div>

            {/* Mensaje */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Mensaje</label>
              <textarea 
                rows={6}
                className="bg-[#f3f3f5] w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition-all text-sm resize-none placeholder:text-gray-400"
                placeholder={`Escribe tu mensaje aquí...\n\nEjemplo:\nHola ${candidate.name.split(" ")[0]},\n\nNos ha impresionado tu perfil y nos gustaría hablar contigo sobre una oportunidad laboral en nuestra empresa...\n\nSaludos,\n[Tu nombre]`}
              ></textarea>
            </div>

          </div>

          {/* Tip / Consejo */}
          <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100 flex gap-3 items-start">
            <Lightbulb className="text-yellow-600 mt-0.5 shrink-0" size={18} />
            <p className="text-xs text-yellow-700 leading-relaxed font-medium">
              <span className="font-bold">Tip:</span> Personaliza tu mensaje mencionando aspectos específicos del perfil del candidato para aumentar la tasa de respuesta.
            </p>
          </div>

        </div>

        {/* PIE DE PÁGINA */}
        <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 shrink-0">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-[#f1e6d8] hover:bg-[#ecd6c0] border border-gray-200 hover:border-gray-300 rounded-xl transition-all shadow-sm"
          >
            Cancelar
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-[#D3bcf6] hover:bg-[#D3bcf6]/70 text-purple-900 rounded-xl shadow-sm transition-colors">
            <Send size={16} />
            Enviar Mensaje
          </button>
        </div>

      </div>
    </div>
  );
}