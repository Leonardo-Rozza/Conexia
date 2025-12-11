import React from 'react';

export default function StatCard({ value, label }) {
  // Coincide con el estilo de la imagen (fondo púrpura muy suave, texto púrpura bold)
  return (
    <div className="p-4 rounded-xl text-center shadow-sm transition hover:shadow-md bg-purple-100/50">
      <div className="text-3xl font-extrabold text-purple-600">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}