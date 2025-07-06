import getLocalProject from "../projectStorage/get";

async function saveServerProject(id: string) {
  const project = getLocalProject(id);
  if (!project) {
    throw new Error("Couldn't get local project");
  }

  const res = await fetch("/api/project/", {
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
  if (!res.ok) {
    throw new Error("Error saving a project");
  }
}

export default saveServerProject;
