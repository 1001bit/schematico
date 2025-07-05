import getLocalProject from "../projectStorage/get";

async function saveServerProject(id: string) {
  const project = getLocalProject(id);
  if (!project) {
    throw new Error("Couldn't get local project");
  }

  return fetch("/api/project/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      name: project.title,
      map: JSON.stringify(project.map),
    }),
  });
}

export default saveServerProject;
