import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Camera } from "../Game/Camera/camera";
import { TileMapType } from "../Game/tilemap";
import migrateProjectId from "./local/migrate";
import saveLocalProject from "./local/save";
import { useNavigate } from "react-router";
import deleteLocalProject from "./local/delete";
import loadServerProject from "./server/load";
import publishServerProject from "./server/publish";
import saveServerProject from "./server/save";
import useDebouncedCallback from "../hooks/debouncedCallback";

export interface ProjectInterface {
  title: string;
  map: TileMapType;
  camera: Camera;
}

function useProjectManager(initProject: ProjectInterface, initId: string) {
  const navigate = useNavigate();

  // ID
  const oldId = useRef(initId);
  const [id, setId] = useState(initId);
  useEffect(() => {
    migrateProjectId(oldId.current, id);
    oldId.current = id;

    navigate(`/project/${id}`, { replace: true });
  }, [id]);

  const isLocal = useMemo(() => {
    return id[0] === "l";
  }, [id]);

  // Project
  const debounceSave = useDebouncedCallback(() => {
    saveLocalProject(id, project);
  }, 500);

  const [project, setProject] = useState(initProject);
  useEffect(() => {
    debounceSave();
  }, [project]);

  // Delete
  const deleteProject = useCallback(() => {
    deleteLocalProject(id);
    navigate("/", { replace: true });
  }, [id]);

  // Load from Server
  const loadProject = useCallback(async () => {
    const data = await loadServerProject(id);
    setProject({
      ...project,
      title: data.name,
      map: data.map,
    });
  }, [id, project]);

  // Publish to Server
  const publishProject = useCallback(async () => {
    const newId = await publishServerProject(project);
    setId(newId);
  }, [project]);

  // Save to Server
  const saveProject = useCallback(() => {
    saveServerProject(id, project);
  }, [project, id]);

  return {
    project,
    isLocal,
    setProject,
    deleteProject,
    loadProject,
    publishProject,
    saveProject,
  };
}

export default useProjectManager;
