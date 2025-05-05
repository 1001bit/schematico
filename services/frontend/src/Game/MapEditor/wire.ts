import { TileMapType } from "../tilemap";
import vector2, { vector2ToStr } from "../vector2";

function placeWire(
  map: TileMapType,
  wireStartTile: vector2,
  mouseTile: vector2
): void {
  const wireStartTileStr = vector2ToStr(wireStartTile);
  const MouseTileStr = vector2ToStr(mouseTile);

  if (wireStartTileStr == MouseTileStr) {
    return;
  }

  const startTile = map[wireStartTileStr];
  if (!startTile) return;

  if (startTile.connections[MouseTileStr]) {
    delete startTile.connections[MouseTileStr];
  } else {
    startTile.connections[MouseTileStr] = true;
  }
}

export default placeWire;
