import { TileMapType } from "../Game/tilemap";
import { Camera } from "../Game/Camera/camera";

export default interface ProjectInterface {
  title: string;
  map: TileMapType;
  camera: Camera;
}
