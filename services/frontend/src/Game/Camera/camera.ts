import { useRef, useState } from "react";
import vector2 from "../vector2";

export interface Camera {
  scale: number;
  x: number;
  y: number;
}

function useCamera(
  cam: Camera,
  scaleBounds: [number, number],
  scaleFactor: number,
  updateCallback: () => void
) {
  const draggingPos = useRef<vector2 | undefined>(undefined);

  const [dragging, setDragging] = useState(false);

  const drag = (pointer: vector2) => {
    if (!draggingPos.current) {
      return;
    }

    cam.x += (draggingPos.current.x - pointer.x) / cam.scale;
    cam.y += (draggingPos.current.y - pointer.y) / cam.scale;

    draggingPos.current = pointer;

    updateCallback();
  };

  const startDrag = (pointer: vector2) => {
    draggingPos.current = pointer;
    setDragging(true);
  };

  const stopDrag = () => {
    setDragging(false);
    draggingPos.current = undefined;
  };

  const zoom = (pointer: vector2, deltaY: number) => {
    const scaleBy = scaleFactor * Math.abs(deltaY / 100);

    const newScale = deltaY < 0 ? cam.scale * scaleBy : cam.scale / scaleBy;

    const [lowBound, highBound] = scaleBounds;
    if (lowBound > newScale || newScale > highBound) return cam;

    const mouseWorldPos = {
      x: cam.x + pointer.x / cam.scale,
      y: cam.y + pointer.y / cam.scale,
    };

    cam.scale = newScale;
    cam.x = mouseWorldPos.x - pointer.x / newScale;
    cam.y = mouseWorldPos.y - pointer.y / newScale;

    updateCallback();
  };

  return {
    drag,
    dragging,
    startDrag,
    stopDrag,
    zoom,
  };
}

export default useCamera;
