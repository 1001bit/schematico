import { Camera, TileMapType } from "../Game/interfaces";

export default interface ProjectInterface {
  id: string;
  title: string;
  map: TileMapType;
  camera: Camera;
}
