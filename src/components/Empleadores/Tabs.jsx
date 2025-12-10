import { Briefcase, Users, BarChart3 } from "lucide-react";

export default function Tabs({ activeTab, onChange }) {
  const tabs = [
    { id: "jobs", label: "Mis Ofertas", icon: Briefcase },
    { id: "candidates", label: "Candidatos", icon: Users },
    { id: "stat", label: "Estadísticas", icon: BarChart3 },
  ];

  return (
    <div className="w-full mt-6">
      <div className="bg-[#ECE6F9] rounded-full p-1 grid grid-cols-3 gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                flex items-center justify-center gap-2 py-1 rounded-full text-sm font-medium transition-all duration-200
                ${isActive 
                  ? "bg-[#a0a0d3] rounded-full font-semibold text-gray-900"
                  : "bg-transparent text-gray-700 hover:bg-[#d3bcf6]/50 rounded-full border border-transparent"
                }
              `}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}