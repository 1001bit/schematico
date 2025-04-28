import { TileMapType } from "../interfaces";
import vector2, { vector2ToStr } from "../vector2";

function placeWire(
  map: TileMapType,
  wireStartTile: vector2,
  mouseWorldTile: vector2
): TileMapType {
  const wireStartTileStr = vector2ToStr(wireStartTile);
  const mouseWorldTileStr = vector2ToStr(mouseWorldTile);

  if (wireStartTileStr == mouseWorldTileStr) {
    return map;
  }

  const startTile = map[wireStartTileStr];

  if (startTile.connections[mouseWorldTileStr]) {
    delete startTile.connections[mouseWorldTileStr];
  } else {
    startTile.connections[mouseWorldTileStr] = true;
  }
  return {
    ...map,
    [wireStartTileStr]: startTile,
  };
}

export default placeWire;
