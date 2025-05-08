import { TileMapType } from "../tilemap";
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

  ctx.beginPath();
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
      true,
      tile.connections[wireEndTileStr]
    );
  } else {
    ctx.beginPath();
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
    ctx.closePath();
  }

  ctx.translate(x, y);
}

export default drawGhostWire;
