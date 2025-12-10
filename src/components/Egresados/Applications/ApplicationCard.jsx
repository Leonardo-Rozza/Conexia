export default function ApplicationCard({ app }) {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition">
      <h3 className="font-bold">{app.job}</h3>
      <p className="text-gray-600">{app.company}</p>

      <span
        className={`
          text-sm font-semibold mt-2 inline-block px-2 py-1 rounded
          ${app.status === "Pendiente" ? "bg-yellow-100 text-yellow-700" : ""}
          ${app.status === "Aceptado" ? "bg-green-100 text-green-700" : ""}
          ${app.status === "Rechazado" ? "bg-red-100 text-red-700" : ""}
        `}
      >
        {app.status}
      </span>
    </div>
  );
}
