import { useLoaderData } from "react-router";
import { useTitle } from "../hooks/title";
import { useCallback, useEffect, useState } from "react";
import Game from "../Game/Game";
import getLocalProject from "../projectStorage/get";
import ProjectInterface from "../projectStorage/project";
import Button from "../components/Button/Button";

export async function loader({
  params,
}: any): Promise<ProjectInterface | undefined> {
  const id = params.projectId;
  if (!id) {
    return;
  }

  return getLocalProject(id);
}

interface SettingsProps {
  className?: string;
}

function Settings({ className }: SettingsProps) {
  return (
    <div
      className={`
        p-5
        bg-acc-bg
        border-1
        border-acc-dim
        backdrop-blur-xs
        w-fit
        h-fit
        ${className}
      `}
    ></div>
  );
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

  const [settingsOpen, setSettingsOpen] = useState(false);
  const openSettings = useCallback(() => {
    setSettingsOpen((s) => !s);
  }, []);

  return (
    <>
      <Button onClick={openSettings} className="fixed left-5 bottom-2">
        settings
      </Button>
      {settingsOpen && (
        <Settings className="fixed left-1/2 top-1/2 -translate-1/2" />
      )}
      <Game
        projectMap={project.map}
        projectId={project.id}
        projectCam={project.camera}
      ></Game>
    </>
  );
}
