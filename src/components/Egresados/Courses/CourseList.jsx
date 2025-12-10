import CourseCard from "./CourseCard";

export default function CourseList() {
  const courses = [
    { name: "React desde Cero", provider: "Udemy" },
    { name: "Testing con Jest", provider: "Platzi" },
    { name: "SQL Básico", provider: "Coderhouse" },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {courses.map((course, i) => (
        <CourseCard key={i} course={course} />
      ))}
    </div>
  );
}
