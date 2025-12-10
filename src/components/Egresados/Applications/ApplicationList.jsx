import ApplicationCard from "./ApplicationCard";

export default function ApplicationList() {
  const apps = [
    { job: "Frontend React", company: "TechCorp", status: "Pendiente" },
    { job: "QA Tester", company: "GlobalSoft", status: "Rechazado" },
    { job: "Node Developer", company: "DevHouse", status: "Aceptado" },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {apps.map((a, i) => (
        <ApplicationCard key={i} app={a} />
      ))}
    </div>
  );
}
