import { ProjectInterface, TileInterface } from "./interfaces";

export function saveLocalMap(id: string, map: Record<string, TileInterface>) {
  const projectsStr = localStorage.getItem("projects");
  if (!projectsStr) {
    return;
  }
  const projects = JSON.parse(projectsStr) as Record<string, ProjectInterface>;
  const project = projects[id];
  if (!projects[id]) {
    return;
  }

  project.map = map;
  projects[id] = project;
  localStorage.setItem("projects", JSON.stringify(projects));
}
