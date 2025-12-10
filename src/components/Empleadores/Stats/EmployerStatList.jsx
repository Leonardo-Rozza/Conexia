import { Briefcase, Users, Calendar, Star } from "lucide-react";
import EmployerStatCard from "./EmployerStatCard";

export default function EmployerStatList() {

  const ProcessRow = ({ title, description, count, bgClass, textClass }) => (
    <div className={`flex items-center justify-between p-4 rounded-xl transition-colors ${bgClass}`}>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-gray-800">{title}</span>
        <span className="text-xs text-gray-500 mt-0.5">{description}</span>
      </div>
      <span className={`text-xl font-bold ${textClass}`}>
        {count}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <EmployerStatCard 
          title="Ofertas Activas" 
          value="2" 
          subtext="+1 desde el mes pasado" 
          icon={Briefcase} 
        />
        <EmployerStatCard 
          title="Aplicaciones" 
          value="73" 
          subtext="+12% desde el mes pasado" 
          icon={Users} 
        />
        <EmployerStatCard 
          title="Entrevistas" 
          value="18" 
          subtext="+5 programadas" 
          icon={Calendar} 
        />
        <EmployerStatCard 
          title="Contrataciones" 
          value="3" 
          subtext="Este mes" 
          icon={Star} 
        />
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <h3 className="text-lg font-medium text-gray-700 mb-6">
          Resumen del Proceso de Reclutamiento
        </h3>

        <div className="space-y-4">
          <ProcessRow 
            title="Aplicaciones Recibidas"
            description="Total de candidatos interesados"
            count={73}
            bgClass="bg-indigo-50 hover:bg-indigo-100"
            textClass="text-indigo-600"
          />
          <ProcessRow 
            title="En Revisión"
            description="Candidatos siendo evaluados"
            count={25}
            bgClass="bg-yellow-50 hover:bg-yellow-100"
            textClass="text-yellow-600"
          />
          <ProcessRow 
            title="Entrevistas Programadas"
            description="Próximas entrevistas"
            count={18}
            bgClass="bg-green-50 hover:bg-green-100"
            textClass="text-green-600"
          />
          <ProcessRow 
            title="Contratados"
            description="Nuevos empleados este mes"
            count={3}
            bgClass="bg-purple-50 hover:bg-purple-100"
            textClass="text-purple-600"
          />
        </div>
      </div>

    </div>
  );
}