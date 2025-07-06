import { TileMapType } from "../../Game/tilemap";

interface ProjectResponse {
  map: TileMapType;
  name: string;
}

async function loadServerProject(id: string): Promise<ProjectResponse> {
  const res = await fetch(`/api/project/${id}`);
  if (!res.ok) {
    throw new Error("HTTP Error getting a project");
  }
  return await res.json();
}

export default loadServerProject;
