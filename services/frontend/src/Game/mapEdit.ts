import { TileInterface, TileMapType, TileType } from "../project/interfaces";
import { ToolType } from "./Toolbar/Tool";

export function editMap(
  setMap: React.Dispatch<React.SetStateAction<TileMapType>>,
  pos: { x: number; y: number },
  toolType: ToolType
) {
  if (toolType == ToolType.Drag || toolType == ToolType.Wire) {
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
    const posStr = `${pos.x},${pos.y}`;
    if (toolType == ToolType.Erase) {
      delete m[posStr];
    } else {
      m[posStr] = {
        type: tileType,
        connections: [],
      } as TileInterface;
    }

    return m;
  });
}
