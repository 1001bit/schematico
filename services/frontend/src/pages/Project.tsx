import { useLoaderData } from "react-router";
import { useTitle } from "../hooks/title/TitleContext";
import { useEffect } from "react";
import { Game } from "../Game/Game";
import Button from "../components/Button/Button";
import { ProjectInterface } from "../project/interfaces";
import { getLocalProject } from "../project/get";

export async function loader({
  params,
}: any): Promise<ProjectInterface | undefined> {
  const id = params.projectId;
  if (!id) {
    return;
  }

  const project = getLocalProject(id);
  if (!project) {
    return;
  }

  return project;
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
      <Game map={project.map}></Game>
      <div className="flex justify-between w-full fixed left-0 bottom-0 px-3 py-2 items-end">
        <Button onClick={() => {}}>settings</Button>
        <Button onClick={() => {}}>play</Button>
      </div>
    </>
  );
}
