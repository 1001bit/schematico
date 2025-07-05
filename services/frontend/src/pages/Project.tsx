import { useLoaderData } from "react-router";
import { useTitle } from "../hooks/title";
import { useCallback, useState } from "react";
import Game from "../Game/Game";
import getLocalProject from "../projectStorage/get";
import ProjectInterface from "../projectStorage/project";
import Button from "../components/Button/Button";
import Settings from "../components/ProjectSettings/settings";

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

  const project = getLocalProject(id);
  if (!project) {
    return;
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

  const [title, setTitle] = useState(initProjectData.project.title);
  useTitle(title);

  const [id, setId] = useState(initProjectData.id);

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
          projectSettings={{
            id: id,
            setId: setId,
            title: title,
            setTitle: setTitle,
          }}
          className="fixed left-1/2 top-1/2 -translate-1/2"
        />
      )}
      <Button onClick={switchMode} className="fixed right-5 bottom-2">
        {started ? "edit" : "play"}
      </Button>
      <Game
        projectId={initProjectData.id}
        project={initProjectData.project}
        started={started}
      ></Game>
    </>
  );
}
