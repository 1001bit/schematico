import { postNewProject } from "../api/newProject";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTitle } from "../hooks/title/TitleContext";
import Button from "../components/Button/Button";
import AnimatedBackground from "../components/Background/Background";
import { CardData } from "../components/ProjectList/ProjectCard";
import ProjectList from "../components/ProjectList/ProjectList";

interface HomeProps {
  projects: CardData[];
}

export default function Home(props: HomeProps) {
  const title = useTitle();
  useEffect(() => {
    title.setTitle("home");
  }, []);

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
        projects={props.projects}
        className="justify-center md:justify-start"
      />
      <Button onClick={newProject} className="w-40">
        {msg}
      </Button>
    </div>
  );
}
