import { TileMapType } from "../Game/tilemap";
import setLocalProject from "../projectStorage/edit";

interface ProjectResponse {
  map: TileMapType;
  name: string;
}

async function loadServerProject(id: string) {
  const res = await fetch(`/api/project/${id}`);
  if (!res.ok) {
    throw new Error("HTTP Error getting a project");
  }
  const data: ProjectResponse = await res.json();
  console.log(data.map);
  setLocalProject(id, {
    title: data.name,
    map: data.map,
  });
}

export default loadServerProject;
