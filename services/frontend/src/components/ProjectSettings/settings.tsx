import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import setLocalProject from "../../projectStorage/edit";
import deleteProject from "../../projectStorage/delete";
import publishServerProject from "../../serverStorage/publish";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import saveServerProject from "../../serverStorage/save";

function DeleteButton({
  id,
  deleteCallback,
}: {
  id: string;
  deleteCallback: () => void;
}) {
  const clickDelete = useCallback(() => {
    deleteProject(id);
    deleteCallback();
  }, [id]);

  return (
    <Button onClick={clickDelete} confirm>
      Delete project
    </Button>
  );
}

function SaveButton({
  id,
  publishCallback,
}: {
  id: string;
  publishCallback: (newId: string) => void;
}) {
  const isLocal = useMemo(() => {
    return id[0] == "l";
  }, [id]);

  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (msg) {
      const timeout = setTimeout(() => {
        setMsg("");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [msg]);

  const publishProject = useCallback(async () => {
    try {
      const newId = await publishServerProject(id);
      if (!newId) {
        throw new Error("couldn't get new id");
      }
      setMsg("Success");
      publishCallback(newId);
    } catch (err) {
      setMsg("Error");
      throw err;
    }
  }, [id]);

  const saveProject = useCallback(async () => {
    try {
      await saveServerProject(id);
      setMsg("Success");
    } catch (err) {
      setMsg("Error");
      throw err;
    }
  }, [id]);

  return isLocal ? (
    <Button onClick={publishProject}>{msg != "" ? msg : "Publish"}</Button>
  ) : (
    <Button onClick={saveProject}>{msg != "" ? msg : "Save"}</Button>
  );
}

function TitleInput({
  id,
  title,
  titleCallback,
}: {
  id: string;
  title: string;
  titleCallback: (newTitle: string) => void;
}) {
  // Title
  const [titleInputVal, setTitleInputVal] = useState(title);
  const submitTitle = useCallback(() => {
    setLocalProject(id, { title: titleInputVal });
    titleCallback(titleInputVal);
  }, [titleInputVal, id]);

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

interface ProjectSettings {
  id: string;
  setId: (id: string) => void;
  title: string;
  setTitle: (title: string) => void;
}

function Settings({
  projectSettings,
  className,
}: {
  projectSettings: ProjectSettings;
  className?: string;
}) {
  const navigate = useNavigate();

  // Delete
  const deleteCallback = useCallback(() => {
    navigate("/");
  }, []);

  // Publish
  const publishCallback = useCallback((newId: string) => {
    projectSettings.setId(newId);
    navigate(`/project/${newId}`, { replace: true });
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
        <div className="flex flex-col gap-2">
          <p className="font-bold">Project name</p>
          <TitleInput
            id={projectSettings.id}
            title={projectSettings.title}
            titleCallback={projectSettings.setTitle}
          ></TitleInput>
        </div>
        <div className="flex flex-col gap-2">
          <SaveButton
            id={projectSettings.id}
            publishCallback={publishCallback}
          ></SaveButton>
          <DeleteButton
            id={projectSettings.id}
            deleteCallback={deleteCallback}
          ></DeleteButton>
        </div>
      </div>
    </div>
  );
}

export default Settings;
