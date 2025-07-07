import { TileMapType } from "../../Game/tilemap";

interface ProjectResponse {
  map: TileMapType;
  name: string;
}

async function loadServerProject(
  id: string
): Promise<ProjectResponse | undefined> {
  const res = await fetch(`/api/project/${id}`);
  if (!res.ok) {
    if (res.status === 404) {
      return;
    }
    throw new Error("HTTP Error getting a project");
  }
  return await res.json();
}

export default loadServerProject;
