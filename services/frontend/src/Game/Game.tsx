import { useEffect, useState } from "react";
import { Layer, Rect, Stage } from "react-konva";

export function Game() {
  const [ww, setWw] = useState(window.innerWidth);
  const [wh, setWh] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWw(window.innerWidth);
      setWh(window.innerHeight);
    });
  }, []);

  return (
    <Stage width={ww} height={wh} className="fixed left-0 top-0" draggable>
      <Layer>
        <Rect x={20} y={20} width={100} height={100} fill="red"></Rect>
      </Layer>
    </Stage>
  );
}
