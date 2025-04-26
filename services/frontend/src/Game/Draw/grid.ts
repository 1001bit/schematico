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

  ctx.strokeStyle = "#505050";
  for (let row = -tileSize; row <= w + tileSize; row += tileSize) {
    ctx.beginPath();
    ctx.moveTo(row, -tileSize);
    ctx.lineTo(row, h + tileSize);
    ctx.stroke();
  }
  for (let col = -tileSize; col <= h + tileSize; col += tileSize) {
    ctx.beginPath();
    ctx.moveTo(-tileSize, col);
    ctx.lineTo(w + tileSize, col);
    ctx.stroke();
  }

  ctx.translate(x % tileSize, y % tileSize);
  ctx.scale(1, 1);
}

export default drawGrid;
