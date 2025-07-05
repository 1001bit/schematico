import ProjectInterface from "./project";

function migrateProjectId(oldId: string, newId: string) {
  const projectsStr = localStorage.getItem("projects");
  if (!projectsStr) {
    throw new Error("No projects in local storage");
  }
  const projects = JSON.parse(projectsStr) as Record<string, ProjectInterface>;
  const project = projects[oldId];
  if (!project) {
    throw new Error("Couldn't find project");
  }
  delete projects[oldId];
  projects[newId] = project;
  localStorage.setItem("projects", JSON.stringify(projects));
}

export default migrateProjectId;
