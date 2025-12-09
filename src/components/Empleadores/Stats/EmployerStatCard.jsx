// components/Empleadores/Stats/EmployerStatCard.jsx
export default function EmployerStatCard({ title, value, subtext, icon: Icon }) {
    
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col justify-between h-full hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-semibold text-gray-600">{title}</span>
        <div className="p-2 bg-gray-50 rounded-lg">
           <Icon size={18} className="text-gray-400" />
        </div>
      </div>
      <div>
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <p className="text-xs text-gray-500 mt-1 font-medium">{subtext}</p>
      </div>
    </div>
  );
}