import { TileMapType, TileType } from "../interfaces";
import { ToolType } from "../Toolbar/Tool";
import vector2, { vector2ToStr } from "../vector2";

function mapTilesEdit(
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

export default mapTilesEdit;
