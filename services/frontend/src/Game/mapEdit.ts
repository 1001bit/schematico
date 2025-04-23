import { TileInterface, TileMapType, TileType } from "../project/interfaces";
import { ToolType } from "./Toolbar/Tool";
import { vector2, vector2ToStr } from "./vector2";

export function mapDraw(
  map: TileMapType,
  tilePos: vector2,
  toolType: ToolType,
  mouseDown: boolean
) {
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
    const newMap = { ...map };
    delete newMap[tilePosStr];
    return newMap;
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

    return {
      ...map,
      [tilePosStr]: {
        type: tileType,
        connections: {},
      },
    };
  }
}

export function mapWireDraw(
  map: TileMapType,
  mouseWorldTile: vector2,
  mouseDown: boolean,
  setWireStart: (map: vector2 | undefined) => void,
  wireStart: vector2 | undefined
) {
  const mouseWorldTileStr = vector2ToStr(mouseWorldTile);
  if (mouseDown) {
    if (!wireStart && map[mouseWorldTileStr]) {
      setWireStart(mouseWorldTile);
    }
    return map;
  }

  if (!wireStart || wireStart == mouseWorldTile) {
    setWireStart(undefined);
    return map;
  }

  const wireStartStr = vector2ToStr(wireStart);
  const tile = map[wireStartStr];
  if (!tile) {
    setWireStart(undefined);
    return map;
  }

  const newStartTile = {
    ...tile,
    connections: { ...tile.connections },
  } as TileInterface;

  if (tile.connections[mouseWorldTileStr]) {
    delete newStartTile.connections[mouseWorldTileStr];
  } else {
    newStartTile.connections[mouseWorldTileStr] = true;
  }

  setWireStart(undefined);

  return {
    ...map,
    [wireStartStr]: newStartTile,
  };
}
