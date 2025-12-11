import React from "react";
import { Building2, MapPin, DollarSign, Calendar } from "lucide-react";

export default function JobCard({ job, onApply = () => {}, applied = [] }) {
  return (
    <article className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-800">{job.title}</h3>
          <div className="mt-2 text-sm text-gray-500 flex flex-wrap gap-3">
            <span className="flex items-center gap-1"><Building2 className="h-4 w-4" />{job.company}</span>
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</span>
            <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" />{job.salary}</span>
          </div>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700">{job.type}</span>
      </div>

      <p className="text-sm text-gray-600 mt-3">{job.description}</p>

      <div className="flex flex-wrap gap-2 mt-3">
        {job.requirements?.map((r) => (
          <span key={r} className="text-xs border px-2 py-1 rounded-full text-gray-700">{r}</span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <Calendar className="h-4 w-4" /> Publicado: {job.postedDate}
        </div>

        <button
          onClick={() => onApply(job.id)}
          disabled={applied.includes(job.id)}
          className={`px-4 py-2 rounded-md text-white text-sm font-medium transition
            ${applied.includes(job.id) ? "bg-gray-300 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
        >
          {applied.includes(job.id) ? "Ya aplicaste" : "Aplicar"}
        </button>
      </div>
    </article>
  );
}
