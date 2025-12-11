import React from 'react';
import { Filter, X, Zap, DollarSign, MapPin } from 'lucide-react';

export default function Filters({ isOpen, onClose }) {
  
  if (!isOpen) return null;

  return (
    // Overlay para el fondo
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end" onClick={onClose}>
      
      {/* Sidebar de Filtros */}
      <div 
        className="bg-white w-full max-w-sm h-full p-6 shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer click dentro
      >
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-xl font-bold text-purple-800 flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Opciones de Filtro
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-gray-600 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          
          {/* Filtro por Tipo de Empleo */}
          <div className="border-b pb-4">
            <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2"><Zap className="h-4 w-4 text-purple-600"/> Tipo de Contrato</h3>
            <div className="space-y-2">
                {['Tiempo completo', 'Medio tiempo', 'Contrato', 'Freelance'].map(type => (
                    <label key={type} className="flex items-center text-sm text-gray-600 cursor-pointer">
                        <input type="checkbox" className="mr-2 rounded text-purple-600 focus:ring-purple-500" />
                        {type}
                    </label>
                ))}
            </div>
          </div>

          {/* Filtro por Salario */}
          <div className="border-b pb-4">
            <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2"><DollarSign className="h-4 w-4 text-purple-600"/> Rango Salarial</h3>
            <input 
                type="range" 
                min="0" 
                max="100000" 
                step="5000" 
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-purple-600"
            />
            <div className='text-sm text-gray-500 text-right mt-1'>€30,000+</div>
          </div>

          {/* Filtro por Ubicación */}
          <div>
            <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2"><MapPin className="h-4 w-4 text-purple-600"/> Ubicación</h3>
            <input 
                type="text" 
                placeholder="Ciudad o País"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition"
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div className='mt-8 flex gap-3'>
            <button className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition">
                Aplicar Filtros
            </button>
            <button 
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition"
            >
                Limpiar
            </button>
        </div>

      </div>
    </div>
  );
}