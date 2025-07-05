import ProjectInterface from "./project";

function createLocalProject(id?: string) {
  const projectsStr = localStorage.getItem("projects");
  let projects = {} as Record<string, ProjectInterface>;
  if (projectsStr) {
    projects = JSON.parse(projectsStr) as Record<string, ProjectInterface>;
  }

  if (!id) {
    let idNum = 1;
    while (projects[`local-${idNum}`]) {
      idNum++;
    }

    id = `local-${idNum}`;
  }
  const project = {
    title: "new project",
    id: id,
    map: {},
    camera: {
      scale: 1,
      x: 0,
      y: 0,
    },
  } as ProjectInterface;
  projects[id] = project;

  localStorage.setItem("projects", JSON.stringify(projects));

  return [id, project];
}

export default createLocalProject;
