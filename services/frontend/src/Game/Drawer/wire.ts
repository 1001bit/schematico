import vector2 from "../vector2";

export const WireColor = "#00ff00";
export const ErrorColor = "#ff0000";

function drawArrow(
  ctx: CanvasRenderingContext2D,
  start: vector2,
  end: vector2,
  color: string
) {
  ctx.beginPath();

  // Draw the tail
  const radius = 2;
  ctx.fillStyle = color;
  ctx.arc(start.x, start.y, radius, 0, 2 * Math.PI);
  ctx.fill();

  // Draw the main line
  ctx.lineWidth = 3;
  ctx.strokeStyle = color;

  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();

  // Draw the arrowhead
  const headLength = 10; // Length of the arrowhead
  const angle = Math.atan2(end.y - start.y, end.x - start.x);
  const forwardOffset = 5; // Move the arrowhead forward
  const arrowTipX = end.x + forwardOffset * Math.cos(angle);
  const arrowTipY = end.y + forwardOffset * Math.sin(angle);

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
  ctx.closePath();
}

function drawWire(
  ctx: CanvasRenderingContext2D,
  wireStart: vector2,
  wireEnd: vector2,
  tileSize: number,
  errorColor?: boolean
) {
  const offset = tileSize / 2;
  const radius = 1 / 2.7;
  const dx = wireEnd.x - wireStart.x;
  const dy = wireEnd.y - wireStart.y;
  const angle = Math.atan2(dy, dx);

  const start = {
    x: wireStart.x + offset + Math.cos(angle) * tileSize * radius,
    y: wireStart.y + offset + Math.sin(angle) * tileSize * radius,
  };
  const end = {
    x: wireEnd.x + offset - Math.cos(angle) * tileSize * radius,
    y: wireEnd.y + offset - Math.sin(angle) * tileSize * radius,
  };

  drawArrow(ctx, start, end, errorColor ? ErrorColor : WireColor);
}

export default drawWire;
