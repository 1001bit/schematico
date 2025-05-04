import { TileMapType } from "../interfaces";
import vector2, { vector2Product, vector2ToStr } from "../vector2";
import drawWire, { WireColor } from "./wire";

function drawGhostWire(
  ctx: CanvasRenderingContext2D,
  map: TileMapType,
  wireStartTile: vector2,
  wireEndTile: vector2,
  x: number,
  y: number,
  tileSize: number
) {
  const wireStartTileStr = vector2ToStr(wireStartTile);
  const tile = map[wireStartTileStr];
  if (!tile) {
    return;
  }

  const wireEndTileStr = vector2ToStr(wireEndTile);

  const wireStartTileScaled = vector2Product(wireStartTile, tileSize);
  const wireEndTileScaled = vector2Product(wireEndTile, tileSize);

  ctx.translate(-x, -y);

  if (wireStartTileStr !== wireEndTileStr) {
    drawWire(
      ctx,
      {
        x: wireStartTileScaled.x,
        y: wireStartTileScaled.y,
      },
      {
        x: wireEndTileScaled.x,
        y: wireEndTileScaled.y,
      },
      tileSize,
      tile.connections[wireEndTileStr]
    );
  } else {
    const radius = 3;
    ctx.fillStyle = WireColor;
    ctx.arc(
      wireStartTileScaled.x + tileSize / 2,
      wireEndTileScaled.y + tileSize / 2,
      radius,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }

  ctx.translate(x, y);
}

export default drawGhostWire;
