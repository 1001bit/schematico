import { TileMapType } from "../Game/interfaces";
import { Camera } from "../Game/Camera/camera";
import ProjectInterface from "./project";

function saveLocalProject(id: string, map: TileMapType, camera: Camera) {
  const projectsStr = localStorage.getItem("projects");
  if (!projectsStr) {
    return;
  }
  const projects = JSON.parse(projectsStr) as Record<string, ProjectInterface>;
  const project = projects[id];
  if (!project) {
    return;
  }

  project.camera = camera;
  project.map = map;
  projects[id] = project;
  localStorage.setItem("projects", JSON.stringify(projects));
}

export default saveLocalProject;
