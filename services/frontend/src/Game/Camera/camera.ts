import { useCallback, useState } from "react";
import vector2 from "../vector2";

export interface Camera {
  scale: number;
  x: number;
  y: number;
}

function useCamera(
  init: Camera,
  scaleBounds: [number, number],
  scaleFactor: number
) {
  const [cam, setCam] = useState(init);
  const [draggingPos, setDraggingPos] = useState<vector2 | undefined>(
    undefined
  );

  const isDragging = useCallback(() => {
    return draggingPos ? true : false;
  }, [draggingPos]);

  const drag = useCallback(
    (pointer: vector2) => {
      if (draggingPos) {
        setCam((c) => ({
          scale: c.scale,
          x: c.x + (draggingPos.x - pointer.x) / c.scale,
          y: c.y + (draggingPos.y - pointer.y) / c.scale,
        }));
      }
      setDraggingPos(pointer);
    },
    [draggingPos]
  );

  const stopDrag = useCallback(() => {
    setDraggingPos(undefined);
  }, []);

  const zoom = useCallback((pointer: vector2, deltaY: number) => {
    const scaleBy = scaleFactor * Math.abs(deltaY / 100);

    setCam((c) => {
      const newScale = deltaY < 0 ? c.scale * scaleBy : c.scale / scaleBy;

      const [lowBound, highBound] = scaleBounds;
      if (lowBound > newScale || newScale > highBound) return c;

      const mouseWorldPos = {
        x: c.x + pointer.x / c.scale,
        y: c.y + pointer.y / c.scale,
      };

      return {
        scale: newScale,
        x: mouseWorldPos.x - pointer.x / newScale,
        y: mouseWorldPos.y - pointer.y / newScale,
      };
    });
  }, []);

  return {
    cam,
    drag,
    isDragging,
    stopDrag,
    zoom,
  };
}

export default useCamera;
