import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useTitle } from "../hooks/title/TitleContext";
import Button from "../components/Button/Button";
import AnimatedBackground from "../components/Background/Background";
import ProjectList from "../components/ProjectList/ProjectList";
import createLocalProject from "../projectStorage/create";
import ProjectInterface from "../projectStorage/project";

export async function loader(): Promise<Record<string, ProjectInterface>> {
  const projectsStr = localStorage.getItem("projects") || "{}";
  return JSON.parse(projectsStr);
}

export default function Home() {
  const projects = useLoaderData() as Record<string, ProjectInterface>;
  const title = useTitle();
  useEffect(() => {
    title.setTitle("home");
  }, []);

  const navigate = useNavigate();

  function newProject() {
    const [id, _] = createLocalProject();
    if (id === "") {
      throw new Error("couldn't create a project");
    }

    navigate(`/project/${id}`);
  }

  return (
    <div
      className="
        flex flex-col
        gap-8 
        px-5
        py-15
        items-center
        md:px-15
        md:items-start
      "
    >
      <AnimatedBackground></AnimatedBackground>
      <h3>Projects:</h3>
      <ProjectList
        projects={projects}
        className="justify-center md:justify-start"
      />
      <Button onClick={newProject} className="w-40">
        new project
      </Button>
    </div>
  );
}
