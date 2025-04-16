import { TileInterface, TileMapType, TileType } from "../project/interfaces";
import { ToolType } from "./Toolbar/Tool";
import { vector2, vector2ToStr } from "./vector2";

export function mapDraw(
  setMap: React.Dispatch<React.SetStateAction<TileMapType>>,
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

  let tileType = TileType.And;
  switch (toolType) {
    case ToolType.Or:
      tileType = TileType.Or;
      break;
    case ToolType.Not:
      tileType = TileType.Not;
      break;
  }

  setMap((m) => {
    const posStr = vector2ToStr(tilePos);
    if (toolType == ToolType.Erase) {
      delete m[posStr];
    } else {
      m[posStr] = {
        type: tileType,
        connections: new Set(),
      } as TileInterface;
    }

    return m;
  });
}

export function mapWireDraw(
  mouseWorldTile: vector2,
  mouseDown: boolean,
  map: TileMapType,
  setMap: (value: React.SetStateAction<TileMapType>) => void,
  setWireStart: (value: React.SetStateAction<vector2 | undefined>) => void,
  wireStart: vector2 | undefined
) {
  const posStr = vector2ToStr(mouseWorldTile);

  if (mouseDown) {
    if (map[posStr]) {
      setWireStart(mouseWorldTile);
    }
    return;
  }
  if (!wireStart) {
    return;
  }

  const wireStartStr = vector2ToStr(wireStart);

  const updatedMap = { ...map };
  if (!updatedMap[wireStartStr].connections.has(posStr)) {
    updatedMap[wireStartStr].connections.add(posStr);
  } else {
    updatedMap[wireStartStr].connections.delete(posStr);
  }
  setMap(updatedMap);
  setWireStart(undefined);
}
