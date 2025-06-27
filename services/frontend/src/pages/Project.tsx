import { useLoaderData, useNavigate } from "react-router";
import { useTitle } from "../hooks/title";
import { useCallback, useEffect, useState } from "react";
import Game from "../Game/Game";
import getLocalProject from "../projectStorage/get";
import ProjectInterface from "../projectStorage/project";
import Button from "../components/Button/Button";
import TextInput from "../components/TextInput/TextInput";
import deleteProject from "../projectStorage/delete";
import setLocalProject from "../projectStorage/edit";

export async function loader({
  params,
}: any): Promise<ProjectInterface | undefined> {
  const id = params.projectId;
  if (!id) {
    return;
  }

  return getLocalProject(id);
}

interface ProjectSettings {
  id: string;
  title: string;
  titleEditCallback: (title: string) => void;
}

interface SettingsProps {
  projectSettings: ProjectSettings;
  className?: string;
}

function Settings({ projectSettings, className }: SettingsProps) {
  const navigate = useNavigate();

  const [titleInput, setTitleInput] = useState(projectSettings.title);
  const submitTitle = useCallback(() => {
    projectSettings.titleEditCallback(titleInput);
    setLocalProject(projectSettings.id, { title: titleInput });
  }, [titleInput]);

  const clickDeleteProject = useCallback(() => {
    deleteProject(projectSettings.id);
    navigate("/");
  }, []);

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
    >
      <div className="flex flex-col gap-8">
        <p className="font-bold">Project name</p>
        <div className="flex gap-1 w-full">
          <TextInput
            value={titleInput}
            placeholder="title"
            length={32}
            onChange={setTitleInput}
            className="w-full"
          ></TextInput>
          <Button onClick={submitTitle}>Enter</Button>
        </div>
        <hr></hr>
        <p className="font-bold">Danger zone</p>
        <div className="flex gap-1">
          <Button className="flex-1" onClick={clickDeleteProject} confirm>
            Delete project
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Project() {
  const project = useLoaderData() as ProjectInterface | undefined;
  if (!project) {
    return <p className="px-5">Project not found!</p>;
  }

  const titleHook = useTitle();

  const [title, setTitle] = useState(project.title);

  useEffect(() => {
    titleHook.setTitle(title);
  }, [title]);

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
            id: project.id,
            title: title,
            titleEditCallback: setTitle,
          }}
          className="fixed left-1/2 top-1/2 -translate-1/2"
        />
      )}
      <Button onClick={switchMode} className="fixed right-5 bottom-2">
        {started ? "edit" : "play"}
      </Button>
      <Game
        projectMap={project.map}
        projectId={project.id}
        projectCam={project.camera}
        started={started}
      ></Game>
    </>
  );
}
