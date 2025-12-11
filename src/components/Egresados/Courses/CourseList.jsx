import React from "react";
import CourseCard from "./CourseCard";

export default function CourseList({ courses = [] }) {
  if (!courses?.length) {
    return <div className="text-center text-gray-500 p-6 bg-white rounded-xl">No hay cursos</div>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {courses.map((c) => (
        <CourseCard key={c.id} course={c} />
      ))}
    </div>
  );
}
