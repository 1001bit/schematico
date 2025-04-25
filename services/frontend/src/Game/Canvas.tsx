import { memo, useEffect, useRef } from "react";

interface CanvasProps {
  className?: string;
  w: number;
  h: number;
  bgColor: string;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
  onMouseMove?: (e: React.MouseEvent) => void;
  draw: (dt: number, ctx: CanvasRenderingContext2D) => void;
}

function Canvas({
  className,
  w,
  h,
  bgColor,
  onMouseMove,
  onMouseDown,
  onMouseUp,
  draw,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener("dragstart", (e) => e.preventDefault());

    return () =>
      canvas.removeEventListener("dragstart", (e) => e.preventDefault());
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function update(currTime: number) {
      if (!ctx) return;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, w, h);
      draw(currTime - lastTime.current, ctx);
      lastTime.current = currTime;
    }
    const req = requestAnimationFrame(update);

    return () => cancelAnimationFrame(req);
  }, [draw]);

  return (
    <canvas
      className={`${className}`}
      ref={canvasRef}
      width={w}
      height={h}
      draggable={true}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    ></canvas>
  );
}

export default memo(Canvas);
