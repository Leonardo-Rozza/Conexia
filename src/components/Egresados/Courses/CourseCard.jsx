import React from "react";
import { Star } from "lucide-react";

export default function CourseCard({ course = {} }) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <h4 className="text-lg font-semibold text-slate-800">{course.title}</h4>
      <p className="text-sm text-gray-500">{course.provider}</p>

      <div className="mt-3 flex items-center gap-3">
        <div className="flex items-center gap-1 text-sm text-yellow-500">
          <Star className="h-4 w-4" /> <span>{course.rating}</span>
        </div>
        <div className="text-sm text-gray-500">{course.duration}</div>
      </div>

      {course.enrolled && (
        <div className="mt-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progreso</span>
            <span>{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${course.progress}%` }} />
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className="font-semibold text-lg">{course.price}</div>
        <button className={`px-4 py-2 rounded-md text-white text-sm ${course.enrolled ? "bg-gray-300" : "bg-purple-600 hover:bg-purple-700"}`}>
          {course.enrolled ? "Continuar" : "Inscribirse"}
        </button>
      </div>
    </div>
  );
}
