import { useCallback, useEffect, useState } from "react";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import { ProjectInterface } from "../../projectManager/project";

function DeleteButton({ deleteProject }: { deleteProject: () => void }) {
  const clickDelete = useCallback(() => {
    deleteProject();
  }, []);

  return (
    <Button onClick={clickDelete} confirm>
      Delete project
    </Button>
  );
}

function SaveButton({ saveProject }: { saveProject: () => void }) {
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (msg) {
      const timeout = setTimeout(() => {
        setMsg("");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [msg]);

  const clickSave = useCallback(async () => {
    try {
      await saveProject();
      setMsg("Success");
    } catch (err) {
      setMsg("Error");
      throw err;
    }
  }, [saveProject]);

  return <Button onClick={clickSave}>{msg != "" ? msg : "Save"}</Button>;
}

function PublishButton({
  publishProject,
}: {
  publishProject: () => Promise<void>;
}) {
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (msg) {
      const timeout = setTimeout(() => {
        setMsg("");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [msg]);

  const clickPublish = useCallback(async () => {
    try {
      await publishProject();
      setMsg("Success");
    } catch (err) {
      setMsg("Error");
      throw err;
    }
  }, [publishProject]);

  return <Button onClick={clickPublish}>{msg != "" ? msg : "Publish"}</Button>;
}

function LoadButton({ loadProject }: { loadProject: () => void }) {
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (msg) {
      const timeout = setTimeout(() => {
        setMsg("");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [msg]);

  const clickLoadProject = useCallback(async () => {
    try {
      await loadProject();
      setMsg("Success");
    } catch (err) {
      setMsg("Error");
      throw err;
    }
  }, [loadProject]);

  return <Button onClick={clickLoadProject}>{msg != "" ? msg : "Load"}</Button>;
}

function TitleInput({
  title,
  titleEdit,
}: {
  title: string;
  titleEdit: (newTitle: string) => void;
}) {
  // Title
  const [titleInputVal, setTitleInputVal] = useState(title);
  const submitTitle = useCallback(() => {
    titleEdit(titleInputVal);
  }, [titleInputVal]);

  return (
    <div className="flex gap-1 w-full">
      <TextInput
        value={titleInputVal}
        placeholder="title"
        length={32}
        onChange={setTitleInputVal}
        className="w-full"
      ></TextInput>
      <Button onClick={submitTitle}>Enter</Button>
    </div>
  );
}

function Settings({
  projectManager,
  className,
}: {
  projectManager: {
    project: ProjectInterface;
    isLocal: boolean;
    setProject: React.Dispatch<React.SetStateAction<ProjectInterface>>;
    deleteProject: () => void;
    loadProject: () => Promise<void>;
    publishProject: () => Promise<void>;
    saveProject: () => void;
  };
  className?: string;
}) {
  const editTitle = (title: string) => {
    projectManager.setProject((p) => ({
      ...p,
      title: title,
    }));
  };

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
        <div className="flex flex-col gap-2">
          <p className="font-bold">Project name</p>
          <TitleInput
            titleEdit={editTitle}
            title={projectManager.project.title}
          ></TitleInput>
        </div>
        <div className="flex flex-col gap-2">
          {projectManager.isLocal ? (
            <PublishButton
              publishProject={projectManager.publishProject}
            ></PublishButton>
          ) : (
            <>
              <SaveButton saveProject={projectManager.saveProject}></SaveButton>
              <LoadButton loadProject={projectManager.loadProject}></LoadButton>
            </>
          )}
          <DeleteButton
            deleteProject={projectManager.deleteProject}
          ></DeleteButton>
        </div>
      </div>
    </div>
  );
}

export default Settings;
