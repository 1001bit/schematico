import { ProjectInterface } from "./interfaces";

export function getLocalProject(id: string) {
  const projectsStr = localStorage.getItem("projects");
  if (!projectsStr) {
    return;
  }
  const projects = JSON.parse(projectsStr) as Record<string, ProjectInterface>;
  return projects[id];
}
