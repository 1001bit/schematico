import { ProjectInterface } from "../project";

async function publishServerProject(
  project: ProjectInterface
): Promise<string> {
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

  return newId;
}

export default publishServerProject;
