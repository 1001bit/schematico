import { TileMapType, TileType } from "../tilemap";
import vector2, { vector2ToStr } from "../vector2";

export function mapTilesEdit(
  map: TileMapType,
  mouseTile: vector2,
  tileType: TileType
): void {
  const tilePosStr = vector2ToStr(mouseTile);
  const tile = map[tilePosStr];
  if (!tile) {
    map[tilePosStr] = {
      type: tileType,
      connections: {},
    };
  } else {
    tile.type = tileType;
  }
}

export function mapTilesErase(map: TileMapType, mouseTile: vector2) {
  const tilePosStr = vector2ToStr(mouseTile);
  const tile = map[tilePosStr];
  if (tile) {
    delete map[tilePosStr];
  }
}
