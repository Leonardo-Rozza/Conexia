export default function ProfileView() {
  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>

      <div className="space-y-3">
        <div>
          <p className="text-gray-700 font-semibold">Nombre:</p>
          <p className="text-gray-600">Juan Pérez</p>
        </div>

        <div>
          <p className="text-gray-700 font-semibold">Email:</p>
          <p className="text-gray-600">juan@example.com</p>
        </div>

        <div>
          <p className="text-gray-700 font-semibold">Profesión:</p>
          <p className="text-gray-600">Desarrollador Frontend</p>
        </div>
      </div>

      <button className="mt-6 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700">
        Editar Perfil
      </button>
    </div>
  );
}
