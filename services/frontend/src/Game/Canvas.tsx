import { useEffect, useRef } from "react";
import { TileMapType } from "../project/interfaces";

interface CanvasProps {
  map: TileMapType;
  id: string;
  className?: string;
  w: number;
  h: number;
  onMouseMove?: (e: React.MouseEvent) => void;
}

export function Canvas({ map, id, className, w, h, onMouseMove }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener("dragstart", (e) => e.preventDefault());

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "blue";
    ctx.fillRect(100, 100, 100, 100);
  }, []);

  return (
    <canvas
      className={`drag-none ${className}`}
      ref={canvasRef}
      width={w}
      height={h}
      draggable={true}
      onMouseMove={onMouseMove}
    ></canvas>
  );
}
