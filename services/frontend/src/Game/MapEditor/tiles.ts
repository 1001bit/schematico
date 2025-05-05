import { TileMapType, TileType } from "../tilemap";
import { ToolType } from "../Toolbar/Toolbar";
import vector2, { vector2ToStr } from "../vector2";

function mapTilesEdit(
  map: TileMapType,
  mouseTile: vector2,
  toolType: ToolType
): void {
  if (toolType == ToolType.Drag || toolType == ToolType.Wire) {
    return;
  }

  const tilePosStr = vector2ToStr(mouseTile);
  const tile = map[tilePosStr];
  if (toolType === ToolType.Erase) {
    if (!tile) {
      return;
    }
    delete map[tilePosStr];
  } else {
    const tileType = {
      [ToolType.Or]: TileType.Or,
      [ToolType.And]: TileType.And,
      [ToolType.Not]: TileType.Not,
      [ToolType.Bulb]: TileType.Bulb,
      [ToolType.Input]: TileType.Input,
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

export default mapTilesEdit;
