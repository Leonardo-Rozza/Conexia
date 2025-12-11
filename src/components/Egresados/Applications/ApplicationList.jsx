import React from "react";
import ApplicationCard from "./ApplicationCard";

export default function ApplicationList({ applications = [] }) {
  if (!applications?.length) {
    return <div className="text-center text-gray-500 p-6 bg-white rounded-xl">No tenés aplicaciones</div>;
  }

  return (
    <div className="grid gap-4 mt-6">
      {applications.map((a) => (
        <ApplicationCard key={a.id} app={a} />
      ))}
    </div>
  );
}
