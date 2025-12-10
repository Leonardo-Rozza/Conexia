export default function JobCard({ job }) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition">
      <h3 className="text-lg font-bold">{job.title}</h3>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-sm text-gray-500 mt-2">{job.location}</p>

      <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">
        Ver Detalles
      </button>
    </div>
  );
}
