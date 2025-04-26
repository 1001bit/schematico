import { TileMapType, TileType } from "../../project/interfaces";
import vector2, { strToVector2, vector2Product } from "../vector2";

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

function intersects(
  start1: vector2,
  end1: vector2,
  start2: vector2,
  end2: vector2
) {
  return (
    Math.max(start2.x, end2.x) >= start1.x &&
    Math.max(start2.y, end2.y) >= start1.y &&
    Math.min(start2.x, end2.x) <= end1.x &&
    Math.min(start2.y, end2.y) <= end1.y
  );
}

function drawTileMap(
  ctx: CanvasRenderingContext2D,
  map: TileMapType,
  x: number,
  y: number,
  w: number,
  h: number,
  tileSize: number
) {
  const canvasStart = {
    x: x - tileSize,
    y: y - tileSize,
  };
  const canvasEnd = {
    x: canvasStart.x + w + tileSize,
    y: canvasStart.y + h + tileSize,
  };

  ctx.translate(-x, -y);

  for (const [posStr, tile] of Object.entries(map)) {
    const pos = vector2Product(strToVector2(posStr), tileSize);

    if (containsPoint(canvasStart, canvasEnd, pos)) {
      ctx.fillStyle = TileColors[tile.type];
      ctx.fillRect(pos.x, pos.y, tileSize, tileSize);
    }

    for (const [wireEndStr, _] of Object.entries(tile.connections)) {
      const wireEnd = vector2Product(strToVector2(wireEndStr), tileSize);

      if (!intersects(canvasStart, canvasEnd, pos, wireEnd)) {
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

export default drawTileMap;
