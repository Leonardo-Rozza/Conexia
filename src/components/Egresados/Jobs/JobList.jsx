import JobCard from "./JobCard";

export default function JobList() {
  const mockJobs = [
    { title: "Desarrollador Frontend", company: "TechCorp", location: "Remoto" },
    { title: "Analista QA", company: "SoftPlus", location: "Buenos Aires" },
    { title: "Backend Node.js", company: "InnovateX", location: "Híbrido" },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {mockJobs.map((job, i) => (
        <JobCard key={i} job={job} />
      ))}
    </div>
  );
}
