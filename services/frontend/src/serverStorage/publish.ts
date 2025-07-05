import createLocalProject from "../projectStorage/create";
import deleteProject from "../projectStorage/delete";
import setLocalProject from "../projectStorage/edit";
import getLocalProject from "../projectStorage/get";

async function publishServerProject(oldId: string): Promise<string> {
  const project = getLocalProject(oldId);
  if (!project) {
    throw new Error("Couldn't get local project");
  }

  const data = await fetch("/api/project/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: project?.title,
    }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("HTTP Error");
    }
    return res.json();
  });

  const newId = data.id;
  if (!newId) {
    throw new Error("Couldn't get newId from response");
  }

  deleteProject(oldId);
  createLocalProject(newId);
  setLocalProject(newId, {
    title: project.title,
    map: project.map,
    cam: project.camera,
  });

  return newId;
}

export default publishServerProject;
