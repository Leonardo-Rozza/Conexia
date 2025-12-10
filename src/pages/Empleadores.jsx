import CandidateList from "../components/Empleadores/Candidates/CandidateList";
import EmployerHeader from "../components/Empleadores/EmployerHeader";
import EmployerJobList from "../components/Empleadores/Jobs/EmployerJobList";
import EmployerStatList from "../components/Empleadores/Stats/EmployerStatList";
import Tabs from "../components/Empleadores/Tabs";
import { useState } from "react";

export default function Empleadores() {
  const [activeTab, setActiveTab] = useState("jobs");

  return (
    <div className="w-full min-h-screen bg-[#FDFBF6]">
      <EmployerHeader />
    
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            
        <div className="mb-8">
          <Tabs activeTab={activeTab} onChange={setActiveTab} />
        </div>
    
            <div className="animate-in fade-in duration-300">
              {/* El componente EmployerJobList ahora se encarga de mostrar su propio título y botón */}
              {activeTab === "jobs" && <EmployerJobList />}
              
              {activeTab === "candidates" && <CandidateList />}
              {activeTab === "stat" && <EmployerStatList />}
            </div>
          </main>
        </div>
  )
}