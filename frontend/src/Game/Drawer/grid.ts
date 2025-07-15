function drawGrid(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  tileSize: number
) {
  ctx.translate(-x % tileSize, -y % tileSize);
  ctx.scale(1, 1);

  ctx.lineWidth = 1;
  ctx.strokeStyle = "#444444";

  ctx.beginPath();

  for (let row = -tileSize; row <= w + tileSize; row += tileSize) {
    ctx.moveTo(row, -tileSize);
    ctx.lineTo(row, h + tileSize);
  }
  for (let col = -tileSize; col <= h + tileSize; col += tileSize) {
    ctx.moveTo(-tileSize, col);
    ctx.lineTo(w + tileSize, col);
  }

  ctx.stroke();
  ctx.closePath();

  ctx.translate(x % tileSize, y % tileSize);
  ctx.scale(1, 1);
}

export default drawGrid;
