import { TileMapType, TileType } from "../project/interfaces";
import { ToolType } from "./Toolbar/Tool";
import { vector2, vector2ToStr } from "./vector2";

export function mapDraw(
  map: TileMapType,
  tilePos: vector2,
  toolType: ToolType,
  mouseDown: boolean
): void {
  if (toolType == ToolType.Drag || toolType == ToolType.Wire) {
    return;
  }

  if (!mouseDown) {
    return;
  }

  const tilePosStr = vector2ToStr(tilePos);
  const tile = map[tilePosStr];
  if (toolType === ToolType.Erase) {
    if (!tile) return;
    delete map[tilePosStr];
  } else {
    const tileType = {
      [ToolType.Or]: TileType.Or,
      [ToolType.And]: TileType.And,
      [ToolType.Not]: TileType.Not,
    }[toolType];
    if (!tileType) return;

    if (tile && tile.type === tileType) {
      return;
    }

    map[tilePosStr] = {
      type: tileType,
      connections: {},
    };
  }
}

export function mapWireDraw(
  map: TileMapType,
  mouseWorldTile: vector2,
  mouseDown: boolean,
  wireStart: vector2 | undefined
): void {
  const mouseWorldTileStr = vector2ToStr(mouseWorldTile);
  if (mouseDown) {
    if (!wireStart && map[mouseWorldTileStr]) {
      wireStart = mouseWorldTile;
    }
    return;
  }

  if (!wireStart || wireStart == mouseWorldTile) {
    wireStart = undefined;
    return;
  }

  const wireStartStr = vector2ToStr(wireStart);
  const startTile = map[wireStartStr];
  if (startTile) {
    if (startTile.connections[mouseWorldTileStr]) {
      delete startTile.connections[mouseWorldTileStr];
    } else {
      startTile.connections[mouseWorldTileStr] = true;
    }
  }
  wireStart = undefined;
}
