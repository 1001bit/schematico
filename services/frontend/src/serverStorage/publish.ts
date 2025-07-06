import getLocalProject from "../projectStorage/get";
import migrateProjectId from "../projectStorage/migrate";

async function publishServerProject(oldId: string): Promise<string> {
  const project = getLocalProject(oldId);
  if (!project) {
    throw new Error("Couldn't get local project");
  }

  const res = await fetch("/api/project/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: project.title,
      map: JSON.stringify(project.map),
    }),
  });
  if (!res.ok) {
    throw new Error("HTTP Error publishing a project");
  }
  const data = await res.json();
  const newId = data.id;
  if (!newId) {
    throw new Error("Couldn't get newId from response");
  }

  migrateProjectId(oldId, newId);

  return newId;
}

export default publishServerProject;
