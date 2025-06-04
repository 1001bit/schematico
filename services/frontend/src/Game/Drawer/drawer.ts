import { useCallback, useEffect, useRef } from "react";
import { Camera } from "../Camera/camera";
import { TileMapType } from "../tilemap";
import drawGrid from "./grid";
import { drawTileLabels, drawTileMap, drawWires } from "./tilemap";
import drawGhostWire from "./ghostWire";
import vector2 from "../vector2";

function useDrawer(
  map: TileMapType,

  config: {
    minGridScale: number;
    minTileLabelScale: number;
    tileSize: number;
    bgColor?: string;
  },

  windowSize: { w: number; h: number },
  started: boolean
) {
  const ctx = useRef<CanvasRenderingContext2D>(undefined);
  const cam = useRef<Camera>(undefined);
  const getState = useRef<(posStr: string) => boolean | undefined>(undefined);

  const startedRef = useRef(started);
  useEffect(() => {
    startedRef.current = started;
  }, [started]);

  const setAttributes = useCallback(
    (
      newCtx: CanvasRenderingContext2D,
      newCam: Camera,
      newGetState: (posStr: string) => boolean | undefined
    ) => {
      ctx.current = newCtx;
      cam.current = newCam;
      getState.current = newGetState;
    },
    []
  );

  const draw = useCallback(
    (newWire?: [vector2, vector2]) => {
      if (!ctx.current || !cam.current || !getState.current) return;

      ctx.current.fillStyle = config.bgColor || "#000000";
      ctx.current.fillRect(
        0,
        0,
        windowSize.w / cam.current.scale,
        windowSize.h / cam.current.scale
      );

      ctx.current.scale(cam.current.scale, cam.current.scale);

      if (cam.current.scale >= config.minGridScale)
        drawGrid(
          ctx.current,
          cam.current.x,
          cam.current.y,
          windowSize.w / cam.current.scale,
          windowSize.h / cam.current.scale,
          config.tileSize
        );

      const order = startedRef.current
        ? ["wires", "tiles"]
        : ["tiles", "wires"];
      for (const toDraw of order) {
        if (toDraw === "wires") {
          drawWires(
            ctx.current,
            map,
            cam.current.x,
            cam.current.y,
            windowSize.w / cam.current.scale,
            windowSize.h / cam.current.scale,
            config.tileSize,
            getState.current
          );
        } else {
          drawTileMap(
            ctx.current,
            map,
            cam.current.x,
            cam.current.y,
            windowSize.w / cam.current.scale,
            windowSize.h / cam.current.scale,
            config.tileSize,
            getState.current
          );
        }
      }

      if (
        cam.current.scale >= config.minTileLabelScale &&
        !startedRef.current
      ) {
        drawTileLabels(
          ctx.current,
          map,
          cam.current.x,
          cam.current.y,
          windowSize.w / cam.current.scale,
          windowSize.h / cam.current.scale,
          config.tileSize
        );
      }

      if (newWire) {
        const [start, end] = newWire;
        drawGhostWire(
          ctx.current,
          map,
          start,
          end,
          cam.current.x,
          cam.current.y,
          config.tileSize
        );
      }

      ctx.current.scale(1 / cam.current.scale, 1 / cam.current.scale);
    },
    [windowSize]
  );

  useEffect(() => {
    draw();
  }, [windowSize, started]);

  return {
    setAttributes,
    draw,
  };
}

export default useDrawer;
