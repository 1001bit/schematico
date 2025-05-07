import { useLoaderData } from "react-router";
import { useTitle } from "../hooks/title";
import { useEffect } from "react";
import Game from "../Game/Game";
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
  useEffect(() => {
    title.setTitle(project.title);
  }, []);

  return (
    <>
      <Game
        projectMap={project.map}
        projectId={project.id}
        projectCam={project.camera}
      ></Game>
    </>
  );
}
