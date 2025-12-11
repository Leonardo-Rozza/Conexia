import { useState } from "react";
// Importaciones de tus componentes...
import Header from "../components/Egresados/Header.jsx";
import Tabs from "../components/Egresados/Tabs.jsx";

// Importaciones de tus vistas...
import JobList from "../components/Egresados/Jobs/JobList.jsx";
import CourseList from "../components/Egresados/Courses/CourseList.jsx";
import ApplicationList from "../components/Egresados/Applications/ApplicationList.jsx";
import ProfileView from "../components/Egresados/Profile/ProfileView.jsx";

// =============================================================
//  DATOS MOCK
// =============================================================

const mockUser = {
name: "Usuario Demo",
email: "demo@ejemplo.com",
};

const mockJobs = [
{ id: '1', title: 'Desarrollador Frontend React', company: 'TechCorp', location: 'Madrid, España', salary: '€35,000 - €45,000', type: 'Tiempo completo', postedDate: '2024-01-03', description: 'Buscamos un desarrollador frontend con experiencia en React y TypeScript, con al menos 3 años de experiencia en desarrollo de interfaces de usuario escalables.', requirements: ['React', 'TypeScript', 'CSS', 'Git'] },
{ id: '2', title: 'Analista de Datos', company: 'DataScience Inc', location: 'Barcelona, España', salary: '€30,000 - €40,000', type: 'Tiempo completo', postedDate: '2024-01-02', description: 'Únete a nuestro equipo de ciencia de datos para analizar grandes volúmenes de datos y generar insights estratégicos.', requirements: ['Python', 'SQL', 'Tableau', 'Estadística'] },
{ id: '3', title: 'Diseñador UX/UI', company: 'Creative Studio', location: 'Valencia, España', salary: '€28,000 - €38,000', type: 'Medio tiempo', postedDate: '2024-01-01', description: 'Buscamos un diseñador creativo para unirse a nuestro equipo y mejorar la experiencia de usuario de nuestros productos.', requirements: ['Figma', 'Adobe Creative Suite', 'Prototipado', 'Investigación UX'] }
];

const mockCourses = [
{ id: '1', title: 'Desarrollo Web Avanzado', provider: 'TechAcademy', duration: '12 semanas', level: 'Intermedio', price: 'Gratuito', rating: 4.8, enrolled: false, progress: 0 },
{ id: '2', title: 'Análisis de Datos con Python', provider: 'DataSchool', duration: '8 semanas', level: 'Principiante', price: '€199', rating: 4.9, enrolled: true, progress: 65 },
{ id: '3', title: 'Diseño UX/UI Profesional', provider: 'Design Institute', duration: '10 semanas', level: 'Intermedio', price: '€299', rating: 4.7, enrolled: false, progress: 0 }
];

const mockApplications = [
{ id: '1', jobTitle: 'Analista de Datos', company: 'DataScience Inc', appliedDate: '2024-01-02', status: 'En revisión' },
{ id: '2', jobTitle: 'Desarrollador Backend', company: 'StartupTech', appliedDate: '2023-12-28', status: 'Entrevista programada' },
{ id: '3', jobTitle: 'Product Manager', company: 'InnovaCorp', appliedDate: '2023-12-25', status: 'Rechazado' }
];

// =============================================================

export default function Egresados() {
const [tab, setTab] = useState("empleos");
const [appliedJobs, setAppliedJobs] = useState(['2']); 
const [searchTerm, setSearchTerm] = useState('');

const handleApplyJob = (jobId) => {
setAppliedJobs(prev => [...prev, jobId]);
};
 
const filteredJobs = mockJobs.filter(job =>
job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
job.company.toLowerCase().includes(searchTerm.toLowerCase())
 );
 
 return (
  // Contenedor principal con el fondo degradado.
  <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-amber-50 pb-12">
        
        {/* 1. HEADER - Contenedor de ancho completo (Full View Width) */}
        {/* NOTA: El componente Header.jsx debe tener sus propios max-w/paddings
           internos para centrar su contenido, mientras que este DIV externo
           se asegura de que la barra del header vaya de borde a borde.
        */}
        <div className="w-full">
            <Header user={mockUser} />
        </div>

        {/* 2. CONTENIDO PRINCIPAL - Centrado con ancho máximo (max-w-6xl) */}
<div className="max-w-6xl mx-auto p-4 sm:p-6 pt-0">
<Tabs tab={tab} setTab={setTab} />

 <div className="pt-6"> 
  {tab === "empleos" && (
  <JobList 
    jobs={filteredJobs} 
    applied={appliedJobs} 
    onApply={handleApplyJob} 
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
  />
)}
 {tab === "cursos" && <CourseList courses={mockCourses} />}
 {tab === "aplicaciones" && <ApplicationList applications={mockApplications} />}
 <div className="relative z-0"> 
   {tab === "perfil" && <ProfileView user={mockUser} applications={mockApplications} courses={mockCourses} />}
 </div>
 </div>
    </div>
  </div>
 );
}