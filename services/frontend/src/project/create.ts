import { ProjectInterface } from "./interfaces";

export function createLocalProject() {
  const projectsStr = localStorage.getItem("projects");
  let projects = {} as Record<string, ProjectInterface>;
  if (projectsStr) {
    projects = JSON.parse(projectsStr) as Record<string, ProjectInterface>;
  }

  let idNum = 1;
  while (projects[`local-${idNum}`]) {
    idNum++;
  }

  const id = `local-${idNum}`;
  const project = {
    title: "new project",
    id: id,
    map: {},
  } as ProjectInterface;
  projects[id] = project;

  localStorage.setItem("projects", JSON.stringify(projects));

  return [id, project];
}
