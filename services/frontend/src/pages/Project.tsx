import { useLoaderData } from "react-router";
import { useTitle } from "../hooks/title";
import { useCallback, useState } from "react";
import Game from "../Game/Game";
import getLocalProject from "../projectManager/local/get";
import Button from "../components/Button/Button";
import Settings from "../components/ProjectSettings/Settings";
import useProjectManager, { ProjectInterface } from "../projectManager/project";
import loadServerProject from "../projectManager/server/load";
import { Camera } from "../Game/Camera/camera";
import createLocalProject from "../projectManager/local/create";

interface ProjectData {
  id: string;
  project: ProjectInterface;
}

export async function loader({
  params,
}: any): Promise<ProjectData | undefined> {
  const id = params.projectId;
  if (!id) {
    return;
  }

  let project = getLocalProject(id);
  if (!project) {
    const data = await loadServerProject(id);
    if (!data) {
      return;
    }
    project = {
      map: data.map,
      title: data.name,
      camera: {
        x: 0,
        y: 0,
        scale: 1,
      } as Camera,
    } as ProjectInterface;
    createLocalProject(id, project);
  }

  return {
    id: id,
    project: project,
  };
}

export default function Project() {
  const initProjectData = useLoaderData() as ProjectData | undefined;
  if (!initProjectData) {
    return <p className="px-5">Project not found!</p>;
  }

  const projectManager = useProjectManager(
    initProjectData.project,
    initProjectData.id
  );

  useTitle(projectManager.project.title);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const switchSettings = useCallback(() => {
    setSettingsOpen((s) => !s);
  }, []);

  const [started, setStarted] = useState(false);
  function switchMode() {
    setStarted(!started);
    setSettingsOpen(false);
  }

  return (
    <>
      <Button onClick={switchSettings} className="fixed left-5 bottom-2">
        {settingsOpen ? "close" : "settings"}
      </Button>
      {settingsOpen && !started && (
        <Settings
          projectManager={projectManager}
          className="fixed left-1/2 top-1/2 -translate-1/2"
        />
      )}
      <Button onClick={switchMode} className="fixed right-5 bottom-2">
        {started ? "edit" : "play"}
      </Button>
      <Game
        project={projectManager.project}
        setProject={projectManager.setProject}
        started={started}
      ></Game>
    </>
  );
}
