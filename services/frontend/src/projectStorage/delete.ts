import ProjectInterface from "./project";

function deleteProject(id: string) {
  const projectsStr = localStorage.getItem("projects");
  let projects = {} as Record<string, ProjectInterface>;
  if (projectsStr) {
    projects = JSON.parse(projectsStr) as Record<string, ProjectInterface>;
  }

  delete projects[id];
  localStorage.setItem("projects", JSON.stringify(projects));
}

export default deleteProject;
