export default function CourseCard({ course }) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition">
      <h3 className="text-lg font-bold">{course.name}</h3>
      <p className="text-gray-600">{course.provider}</p>

      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Ver Curso
      </button>
    </div>
  );
}
