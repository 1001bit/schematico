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
