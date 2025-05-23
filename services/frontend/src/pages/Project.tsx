import { useLoaderData } from "react-router";
import { useTitle } from "../hooks/title";
import { useCallback, useEffect, useRef, useState } from "react";
import Game from "../Game/Game";
import getLocalProject from "../projectStorage/get";
import ProjectInterface from "../projectStorage/project";
import Button from "../components/Button/Button";
import TextInput from "../components/TextInput/TextInput";
import { saveLocalProjectTitle } from "../projectStorage/save";

export async function loader({
  params,
}: any): Promise<ProjectInterface | undefined> {
  const id = params.projectId;
  if (!id) {
    return;
  }

  return getLocalProject(id);
}

interface BaseParams {
  id: string;
  title: string;
}

interface SettingsProps {
  base: BaseParams;
  closeCallback: () => void;
  className?: string;
}

function Settings({ base, className, closeCallback }: SettingsProps) {
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        windowRef.current &&
        !windowRef.current.contains(event.target as Node)
      ) {
        closeCallback();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const [titleInput, setTitleInput] = useState(base.title);
  const submitTitle = useCallback(() => {
    saveLocalProjectTitle(base.id, titleInput);
  }, [titleInput]);

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
      ref={windowRef}
    >
      <div className="flex flex-col gap-2">
        <p className="font-bold">Project title</p>
        <div className="flex gap-1">
          <TextInput
            value={titleInput}
            placeholder="title"
            length={32}
            onChange={setTitleInput}
          ></TextInput>
          <Button onClick={submitTitle}>Enter</Button>
        </div>
      </div>
    </div>
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
  const toggleSettings = useCallback(() => {
    setSettingsOpen((s) => !s);
  }, []);

  return (
    <>
      <Button onClick={toggleSettings} className="fixed left-5 bottom-2">
        settings
      </Button>
      {settingsOpen && (
        <Settings
          base={{
            id: project.id,
            title: project.title,
          }}
          closeCallback={toggleSettings}
          className="fixed left-1/2 top-1/2 -translate-1/2"
        />
      )}
      <Game
        projectMap={project.map}
        projectId={project.id}
        projectCam={project.camera}
      ></Game>
    </>
  );
}
