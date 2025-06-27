import { TileMapType } from "../Game/tilemap";
import { Camera } from "../Game/Camera/camera";
import ProjectInterface from "./project";
import getLocalProject from "./get";

function setLocalProject(
  id: string,
  params: { title?: string; map?: TileMapType; cam?: Camera }
) {
  const projectsStr = localStorage.getItem("projects");
  if (!projectsStr) {
    return;
  }
  const projects = JSON.parse(projectsStr) as Record<string, ProjectInterface>;
  const project = getLocalProject(id);
  if (!project) {
    return;
  }

  params.title && (project.title = params.title);
  params.map && (project.map = params.map);
  params.cam && (project.camera = params.cam);

  projects[id] = project;
  localStorage.setItem("projects", JSON.stringify(projects));
}

export default setLocalProject;
