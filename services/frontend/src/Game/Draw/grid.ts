function drawGrid(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  tileSize: number
) {
  ctx.translate(-x % tileSize, -y % tileSize);

  ctx.strokeStyle = "#505050";
  for (let row = 0; row < w; row += tileSize) {
    ctx.beginPath();
    ctx.moveTo(row, -tileSize);
    ctx.lineTo(row, h);
    ctx.stroke();
  }
  for (let col = 0; col < h; col += tileSize) {
    ctx.beginPath();
    ctx.moveTo(-tileSize, col);
    ctx.lineTo(w, col);
    ctx.stroke();
  }

  ctx.translate(x % tileSize, y % tileSize);
}

export default drawGrid;
