import { useRef, useState } from "react";
import vector2 from "../vector2";

export interface Camera {
  scale: number;
  x: number;
  y: number;
}

function useCamera(
  initCamera: Camera,
  scaleBounds: [number, number],
  scaleFactor: number,
  updateCallback: () => void
) {
  const cam = useRef(initCamera);
  const draggingPos = useRef<vector2 | undefined>(undefined);

  const [dragging, setDragging] = useState(false);

  const drag = (pointer: vector2) => {
    if (!draggingPos.current) {
      return;
    }

    cam.current.x += (draggingPos.current.x - pointer.x) / cam.current.scale;
    cam.current.y += (draggingPos.current.y - pointer.y) / cam.current.scale;

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

    const newScale =
      deltaY < 0 ? cam.current.scale * scaleBy : cam.current.scale / scaleBy;

    const [lowBound, highBound] = scaleBounds;
    if (lowBound > newScale || newScale > highBound) return cam.current;

    const mouseWorldPos = {
      x: cam.current.x + pointer.x / cam.current.scale,
      y: cam.current.y + pointer.y / cam.current.scale,
    };

    cam.current.scale = newScale;
    cam.current.x = mouseWorldPos.x - pointer.x / newScale;
    cam.current.y = mouseWorldPos.y - pointer.y / newScale;

    updateCallback();
  };

  return {
    cam: cam.current,
    drag,
    dragging,
    startDrag,
    stopDrag,
    zoom,
  };
}

export default useCamera;
