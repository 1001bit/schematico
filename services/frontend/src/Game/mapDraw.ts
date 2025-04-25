import { TileMapType, TileType } from "../project/interfaces";
import vector2, { strToVector2, vector2Product } from "./vector2";

export const TileColors: Record<TileType, string> = {
  [TileType.Or]: "#ff0000",
  [TileType.And]: "#00ffff",
  [TileType.Not]: "#ffff00",
};
export const WireColor = "#00ff00";

function containsPoint(start: vector2, end: vector2, point: vector2) {
  return (
    point.x >= start.x &&
    point.y >= start.y &&
    point.x <= end.x &&
    point.y <= end.y
  );
}

function containsLine(
  start: vector2,
  end: vector2,
  lineStart: vector2,
  lineEnd: vector2
) {
  return (
    Math.max(lineStart.x, lineEnd.x) >= start.x &&
    Math.max(lineStart.y, lineEnd.y) >= start.y &&
    Math.min(lineStart.x, lineEnd.x) <= end.x &&
    Math.min(lineStart.y, lineEnd.y) <= end.y
  );
}

export function drawTileMap(
  ctx: CanvasRenderingContext2D,
  map: TileMapType,
  x: number,
  y: number,
  w: number,
  h: number,
  tileSize: number
) {
  const start = {
    x: x,
    y: y,
  };
  const end = {
    x: start.x + w,
    y: start.y + h,
  };

  ctx.translate(-x, -y);

  for (const [posStr, tile] of Object.entries(map)) {
    const pos = vector2Product(strToVector2(posStr), tileSize);

    if (containsPoint(start, end, pos)) {
      ctx.fillStyle = TileColors[tile.type];
      ctx.fillRect(pos.x, pos.y, tileSize, tileSize);
    }

    for (const [wireEndStr, _] of Object.entries(tile.connections)) {
      const wireEnd = vector2Product(strToVector2(wireEndStr), tileSize);
      console.log(pos, wireEnd);

      if (!containsLine(start, end, pos, wireEnd)) {
        continue;
      }
      ctx.beginPath();
      ctx.strokeStyle = WireColor;
      ctx.moveTo(pos.x, pos.y);
      ctx.lineTo(wireEnd.x, wireEnd.y);
      ctx.stroke();
    }
  }

  ctx.translate(x, y);
}
