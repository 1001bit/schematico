import { TileMapType } from "../interfaces";
import vector2, { vector2Product, vector2ToStr } from "../vector2";
import drawArrow from "./arrow";
import { WireColor } from "./tilemap";

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
  const wireEndTileStr = vector2ToStr(wireEndTile);
  const tile = map[wireStartTileStr];
  if (!tile) {
    return;
  }

  const wireStartTileScaled = vector2Product(wireStartTile, tileSize);
  const wireEndTileScaled = vector2Product(wireEndTile, tileSize);

  const color = tile.connections[wireEndTileStr] ? "#ff0000" : WireColor;
  ctx.translate(-x, -y);
  drawArrow(
    ctx,
    {
      x: wireStartTileScaled.x + tileSize / 2,
      y: wireStartTileScaled.y + tileSize / 2,
    },
    {
      x: wireEndTileScaled.x + tileSize / 2,
      y: wireEndTileScaled.y + tileSize / 2,
    },
    color
  );
  ctx.translate(x, y);
}

export default drawGhostWire;
