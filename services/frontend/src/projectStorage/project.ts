import { TileMapType } from "../Game/interfaces";
import { Camera } from "../Game/Camera/camera";

export default interface ProjectInterface {
  id: string;
  title: string;
  map: TileMapType;
  camera: Camera;
}
