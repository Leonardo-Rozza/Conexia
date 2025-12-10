import { useState } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";

import JobList from "./components/Jobs/JobList";
import CourseList from "./components/Courses/CourseList";
import ApplicationList from "./components/Applications/ApplicationList";
import ProfileView from "./components/Profile/ProfileView";

export default function Egresados() {
  const [tab, setTab] = useState("empleos");

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Header />
      <Tabs tab={tab} setTab={setTab} />

      <div className="mt-8">
        {tab === "empleos" && <JobList />}
        {tab === "cursos" && <CourseList />}
        {tab === "aplicaciones" && <ApplicationList />}
        {tab === "perfil" && <ProfileView />}
      </div>
    </div>
  );
}