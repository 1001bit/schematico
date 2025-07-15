import { memo, useEffect, useRef } from "react";

interface CanvasProps {
  className?: string;
  w: number;
  h: number;
  bgColor: string;
  ctxCallback: (ctx: CanvasRenderingContext2D) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
  onMouseMove?: (e: React.MouseEvent) => void;
  onWheel?: (e: React.WheelEvent) => void;
}

function Canvas({
  className,
  w,
  h,
  ctxCallback,
  onMouseMove,
  onMouseDown,
  onMouseUp,
  onWheel,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    ctxCallback(ctx);
  }, []);

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
      onWheel={onWheel}
    ></canvas>
  );
}

export default memo(Canvas);
