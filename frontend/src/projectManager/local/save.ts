import { ProjectInterface } from "../project";

function saveLocalProject(id: string, newProject: ProjectInterface) {
  const projectsStr = localStorage.getItem("projects");
  if (!projectsStr) {
    return;
  }
  const projects = JSON.parse(projectsStr) as Record<string, ProjectInterface>;

  projects[id] = newProject;
  localStorage.setItem("projects", JSON.stringify(projects));
}

export default saveLocalProject;
