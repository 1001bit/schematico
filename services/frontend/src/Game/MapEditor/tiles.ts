import { TileMapType } from "../tilemap";
import { ToolToTileType, ToolType } from "../Toolbar/Toolbar";
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
    const tileType = ToolToTileType[toolType];
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
