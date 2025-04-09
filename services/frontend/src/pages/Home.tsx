import ProjectList, {
  ProjectListData,
} from "../components/ProjectList/ProjectList";
import { postNewProject } from "../api/newProject";
import { useState } from "react";

import { useNavigate } from "react-router";

export default function Home(props: ProjectListData) {
  const navigate = useNavigate();

  const [msg, setMsg] = useState("new project");

  const newProject = async () => {
    try {
      const newProj = await postNewProject();
      newProj.authorized
        ? navigate(`/project/${newProj.id}`)
        : navigate("/signin");
    } catch {
      setMsg("an error occurred");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3>Projects:</h3>
      <ProjectList projects={props.projects} />
      <p>
        <a onClick={newProject}>{msg}</a>
      </p>
    </div>
  );
}
