export default function Tabs({ tab, setTab }) {
  const buttons = [
    { id: "empleos", label: "Empleos" },
    { id: "cursos", label: "Cursos" },
    { id: "aplicaciones", label: "Postulaciones" },
    { id: "perfil", label: "Perfil" },
  ];

  return (
    <div className="flex gap-2 border-b pb-2">
      {buttons.map((b) => (
        <button
          key={b.id}
          onClick={() => setTab(b.id)}
          className={`px-4 py-2 rounded-t-md transition border-b-2 ${
            tab === b.id
              ? "border-purple-500 text-purple-600 font-semibold"
              : "border-transparent text-gray-600 hover:text-gray-800"
          }`}
        >
          {b.label}
        </button>
      ))}
    </div>
  );
}
