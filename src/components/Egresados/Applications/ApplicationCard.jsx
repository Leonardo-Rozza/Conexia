import React from "react";
import { Calendar } from "lucide-react";

export default function ApplicationCard({ app = {} }) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition">
      <div>
        <div className="font-medium text-slate-800">{app.jobTitle}</div>
        <div className="text-sm text-gray-500">{app.company}</div>
        <div className="text-sm text-gray-400 flex items-center gap-2 mt-2">
          <Calendar className="h-4 w-4" /> Aplicado: {app.appliedDate}
        </div>
      </div>

      <div>
        <span className={`px-3 py-1 rounded-lg text-white text-sm ${app.statusColor || "bg-gray-400"}`}>
          {app.status}
        </span>
      </div>
    </div>
  );
}
