import { TileType } from "../tilemap";
import vector2 from "../vector2";

export const TileColors: Record<TileType, string> = {
  [TileType.Or]: "#ff0000",
  [TileType.And]: "#00ffff",
  [TileType.Not]: "#ffff00",
  [TileType.Input]: "#00ff00",
  [TileType.Bulb]: "#ffffff",
};

export const TileLabels: Record<TileType, string> = {
  [TileType.Or]: "OR",
  [TileType.And]: "AND",
  [TileType.Not]: "NOT",
  [TileType.Input]: "Off",
  [TileType.Bulb]: "Off",
};

function drawTile(
  ctx: CanvasRenderingContext2D,
  tileType: TileType,
  pos: vector2,
  tileSize: number
) {
  ctx.fillStyle = TileColors[tileType] + "13";
  ctx.fillRect(pos.x + 1, pos.y + 1, tileSize - 2, tileSize - 2);
  ctx.strokeStyle = TileColors[tileType];
  ctx.lineWidth = 1;
  ctx.strokeRect(pos.x + 1, pos.y + 1, tileSize - 2, tileSize - 2);
}

export function drawTileLabel(
  ctx: CanvasRenderingContext2D,
  tileType: TileType,
  pos: vector2,
  tileSize: number
) {
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = TileColors[tileType];
  ctx.font = "10px DM Mono";
  ctx.fillText(
    TileLabels[tileType],
    pos.x + tileSize / 2,
    pos.y + tileSize / 2
  );
}

export default drawTile;
