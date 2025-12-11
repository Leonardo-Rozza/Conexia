import React from "react";
import { User, Edit } from "lucide-react";
import StatCard from "./StatCard"; // Importamos el nuevo componente

export default function ProfileView({ user = {}, applications = [], courses = [] }) {
  
  const totalApplications = applications.length;
  const interviewsScheduled = applications.filter(a => a.status === 'Entrevista programada').length;
  const enrolledCourses = courses.filter(c => c.enrolled).length;
  const profileCompletion = '85%'; 

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      
      {/* Información Personal (Coincide con la imagen) */}
      <div className="lg:col-span-1 bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-slate-800 mb-5">
            Información Personal
        </h3>

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-24 w-24 rounded-full bg-purple-200 flex items-center justify-center text-4xl font-semibold text-purple-700">
            {user?.name?.charAt(0) || <User className="h-8 w-8" />}
          </div>
          
          <div className="space-y-1">
              <h4 className="text-xl font-bold text-slate-800">{user.name}</h4>
              <p className="text-sm text-gray-500">{user.email}</p>
              <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">Egresado</span>
          </div>

          {/* Botón Editar Perfil (Coincide con la imagen) */}
          <button className="w-full mt-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 transition">
            Editar Perfil
          </button>
        </div>
      </div>

      {/* Estadísticas (Coincide con el layout 2x2 de la imagen) */}
      <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-slate-800 mb-5">Estadísticas</h3>

        <div className="grid grid-cols-2 gap-4">
          <StatCard value={totalApplications} label="Aplicaciones" />
          <StatCard value={interviewsScheduled} label="Entrevistas" /> 
          <StatCard value={enrolledCourses} label="Cursos" />
          <StatCard value={profileCompletion} label="Perfil" />
        </div>
      </div>
    </div>
  );
}