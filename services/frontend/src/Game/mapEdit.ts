import { TileMapType, TileType } from "../project/interfaces";
import { ToolType } from "./Toolbar/Tool";
import { vector2, vector2ToStr } from "./vector2";

export function mapEdit(
  map: TileMapType,
  mouseWorldTile: vector2,
  toolType: ToolType
): TileMapType {
  if (toolType == ToolType.Drag || toolType == ToolType.Wire) {
    return map;
  }

  const tilePosStr = vector2ToStr(mouseWorldTile);
  const tile = map[tilePosStr];
  if (toolType === ToolType.Erase) {
    if (!tile) {
      return map;
    }
    const newMap = { ...map };
    delete newMap[tilePosStr];
    return newMap;
  } else {
    const tileType = {
      [ToolType.Or]: TileType.Or,
      [ToolType.And]: TileType.And,
      [ToolType.Not]: TileType.Not,
    }[toolType];
    if (!tileType) return map;

    if (tile && tile.type === tileType) {
      return map;
    }

    const newMap = {
      ...map,
      [tilePosStr]: {
        type: tileType,
        connections: {},
      },
    };

    return newMap;
  }
}

export function mapStartWire(
  map: TileMapType,
  mouseWorldTile: vector2,
  wireStart: vector2 | undefined
) {
  const mouseWorldTileStr = vector2ToStr(mouseWorldTile);
  if (!wireStart && map[mouseWorldTileStr]) {
    wireStart = mouseWorldTile;
  }
}

export function mapEndWire(
  map: TileMapType,
  mouseWorldTile: vector2,
  wireStart: vector2 | undefined
): TileMapType {
  if (!wireStart) {
    return map;
  }

  const mouseWorldTileStr = vector2ToStr(mouseWorldTile);
  if (wireStart === mouseWorldTile) {
    wireStart = undefined;
    return map;
  }

  const wireStartStr = vector2ToStr(wireStart);
  if (!map[wireStartStr]) {
    wireStart = undefined;
    return map;
  }

  const newMap = { ...map };
  const startTile = newMap[wireStartStr];
  if (startTile.connections[mouseWorldTileStr]) {
    delete startTile.connections[mouseWorldTileStr];
  } else {
    startTile.connections[mouseWorldTileStr] = true;
  }

  wireStart = undefined;
  return newMap;
}
