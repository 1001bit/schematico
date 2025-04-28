import vector2 from "../vector2";

function drawArrow(
  ctx: CanvasRenderingContext2D,
  start: vector2,
  end: vector2,
  color: string
) {
  const headLength = 10; // Length of the arrowhead
  const angle = Math.atan2(end.y - start.y, end.x - start.x);

  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.strokeStyle = color;

  // Draw the main line
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();

  // Draw the arrowhead
  const forwardOffset = 5; // Move the arrowhead forward
  const arrowTipX = end.x + forwardOffset * Math.cos(angle);
  const arrowTipY = end.y + forwardOffset * Math.sin(angle);

  ctx.beginPath();
  ctx.moveTo(arrowTipX, arrowTipY);
  ctx.lineTo(
    arrowTipX - headLength * Math.cos(angle - Math.PI / 6),
    arrowTipY - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    arrowTipX - headLength * Math.cos(angle + Math.PI / 6),
    arrowTipY - headLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.lineTo(arrowTipX, arrowTipY);
  ctx.fillStyle = color;
  ctx.fill();
}

export default drawArrow;
