import { TileMapType } from "../Game/tilemap";
import { Camera } from "../Game/Camera/camera";
import ProjectInterface from "./project";
import getLocalProject from "./get";

function setLocalProject(id: string, project: ProjectInterface) {
  const projectsStr = localStorage.getItem("projects");
  if (!projectsStr) {
    return;
  }
  const projects = JSON.parse(projectsStr) as Record<string, ProjectInterface>;
  projects[id] = project;
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function saveLocalProjectMapAndCam(
  id: string,
  map: TileMapType,
  camera: Camera
) {
  const project = getLocalProject(id);
  if (!project) {
    return;
  }

  project.camera = camera;
  project.map = map;
  setLocalProject(id, project);
}

export function saveLocalProjectTitle(id: string, title: string) {
  const project = getLocalProject(id);
  if (!project) {
    return;
  }

  project.title = title;
  setLocalProject(id, project);
}
