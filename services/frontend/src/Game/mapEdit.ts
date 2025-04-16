import { TileInterface, TileType } from "../project/interfaces";
import { ToolType } from "./Toolbar/Tool";
import { vector2, vector2ToStr } from "./vector2";

export function mapDraw(
  map: Record<string, TileInterface>,
  setMap: React.Dispatch<React.SetStateAction<Record<string, TileInterface>>>,
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
    setMap(newMap);
    return;
  }

  const tileType = {
    [ToolType.Or]: TileType.Or,
    [ToolType.And]: TileType.And,
    [ToolType.Not]: TileType.Not,
  }[toolType];

  if (tile && tile.type === tileType) {
    return;
  }

  setMap({
    ...map,
    [tilePosStr]: {
      type: tileType,
      connections: {},
    },
  });
}

export function mapWireDraw(
  mouseWorldTile: vector2,
  mouseDown: boolean,
  map: Record<string, TileInterface>,
  setMap: (value: React.SetStateAction<Record<string, TileInterface>>) => void,
  setWireStart: (value: React.SetStateAction<vector2 | undefined>) => void,
  wireStart: vector2 | undefined
) {
  const mouseWorldTileStr = vector2ToStr(mouseWorldTile);
  if (mouseDown) {
    if (map[mouseWorldTileStr]) {
      setWireStart(mouseWorldTile);
    }
    return;
  }

  if (!wireStart) return;

  const wireStartStr = vector2ToStr(wireStart);
  const tile = map[wireStartStr];
  if (!tile) return;

  const newStartTile = {
    ...tile,
    connections: { ...tile.connections },
  } as TileInterface;

  if (tile.connections[mouseWorldTileStr]) {
    delete newStartTile.connections[mouseWorldTileStr];
  } else {
    newStartTile.connections[mouseWorldTileStr] = true;
  }

  setMap({
    ...map,
    [wireStartStr]: newStartTile,
  });
  setWireStart(undefined);
}
