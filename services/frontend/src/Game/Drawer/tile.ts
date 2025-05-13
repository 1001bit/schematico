import { TileType } from "../tilemap";
import vector2 from "../vector2";

export const TileColors = {
  [TileType.Or]: "#ff0000",
  [TileType.And]: "#00ffff",
  [TileType.Not]: "#ffff00",
  [TileType.Input]: "#00ff00",
  [TileType.Bulb]: "#ffffff",
};

export const TileLabels = {
  [TileType.Or]: "OR",
  [TileType.And]: "AND",
  [TileType.Not]: "NOT",
  [TileType.Input]: "Input",
  [TileType.Bulb]: "Bulb",
};

export const RoundTiles = new Set([TileType.Or, TileType.And, TileType.Not]);

function drawTile(
  ctx: CanvasRenderingContext2D,
  tileType: TileType,
  pos: vector2,
  tileSize: number,
  active: boolean
) {
  const opacity = active ? "ff" : "13";

  ctx.fillStyle = "#000000";
  ctx.strokeStyle = TileColors[tileType];
  ctx.lineWidth = 1;

  if (RoundTiles.has(tileType)) {
    const radius = (tileSize - 2) / 2;

    // black arc
    ctx.beginPath();
    ctx.arc(pos.x + radius + 1, pos.y + radius + 1, radius, 0, 2 * Math.PI);
    ctx.fill();

    // tile
    ctx.fillStyle = TileColors[tileType] + opacity;
    ctx.arc(pos.x + radius + 1, pos.y + radius + 1, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  } else {
    // back rect
    ctx.fillRect(pos.x + 1, pos.y + 1, tileSize - 2, tileSize - 2);
    ctx.fillStyle = TileColors[tileType] + opacity;
    // tile
    ctx.fillRect(pos.x + 1, pos.y + 1, tileSize - 2, tileSize - 2);
    ctx.strokeRect(pos.x + 1, pos.y + 1, tileSize - 2, tileSize - 2);
  }
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
  ctx.font = "8px DM Mono";
  ctx.fillText(
    TileLabels[tileType],
    pos.x + tileSize / 2,
    pos.y + tileSize / 2
  );
}

export default drawTile;
