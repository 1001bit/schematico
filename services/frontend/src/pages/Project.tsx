import { useLoaderData } from "react-router";
import { useTitle } from "../hooks/title/TitleContext";
import { useEffect, useState } from "react";
import Game from "../Game/Game";
import Button from "../components/Button/Button";
import getLocalProject from "../projectStorage/get";
import ProjectInterface from "../projectStorage/project";

export async function loader({
  params,
}: any): Promise<ProjectInterface | undefined> {
  const id = params.projectId;
  if (!id) {
    return;
  }

  return getLocalProject(id);
}

export default function Project() {
  const title = useTitle();
  const project = useLoaderData() as ProjectInterface | undefined;
  if (!project) {
    return <p className="px-5">Project not found!</p>;
  }

  const [started, setStarted] = useState(false);

  useEffect(() => {
    title.setTitle(project.title);
  }, []);

  return (
    <>
      <Game
        projectMap={project.map}
        projectId={project.id}
        camera={project.camera}
        started={started}
      ></Game>
      <Button
        onClick={() => {
          setStarted((s) => !s);
        }}
        className="fixed right-5 bottom-2"
      >
        {started ? "edit" : "play"}
      </Button>
    </>
  );
}
