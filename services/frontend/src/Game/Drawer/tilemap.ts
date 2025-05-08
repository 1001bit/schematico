import { TileMapType } from "../tilemap";
import vector2, { strToVector2, vector2Product } from "../vector2";
import drawTile, { drawTileLabel } from "./tile";
import drawWire from "./wire";

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

export function drawTileMap(
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
      drawTile(ctx, tile.type, pos, tileSize);
    }
  }

  ctx.translate(x, y);
}

export function drawTileLabels(
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
      drawTileLabel(ctx, tile.type, pos, tileSize);
    }
  }

  ctx.translate(x, y);
}

export function drawWires(
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

    for (const [wireEndStr, _] of Object.entries(tile.connections)) {
      const wireEnd = vector2Product(strToVector2(wireEndStr), tileSize);

      if (!intersects(canvasStart, canvasEnd, pos, wireEnd)) {
        continue;
      }

      drawWire(ctx, pos, wireEnd, tileSize, false);
    }
  }

  ctx.translate(x, y);
}
