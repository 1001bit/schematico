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
  const activeTiles = useRef<Map<string, boolean>>(undefined);

  const startedRef = useRef(started);
  useEffect(() => {
    startedRef.current = started;
  }, [started]);

  const setAttributes = useCallback(
    (
      newCtx: CanvasRenderingContext2D,
      newCam: Camera,
      newActiveTiles: Map<string, boolean>
    ) => {
      ctx.current = newCtx;
      cam.current = newCam;
      activeTiles.current = newActiveTiles;
    },
    []
  );

  const draw = useCallback((newWire?: [vector2, vector2]) => {
    if (!ctx.current || !cam.current || !activeTiles.current) return;

    ctx.current.fillStyle = config.bgColor || "#000000";
    ctx.current.fillRect(0, 0, windowSize.w, windowSize.h);

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
    drawTileMap(
      ctx.current,
      map,
      cam.current.x,
      cam.current.y,
      windowSize.w / cam.current.scale,
      windowSize.h / cam.current.scale,
      config.tileSize,
      activeTiles.current
    );
    drawWires(
      ctx.current,
      map,
      cam.current.x,
      cam.current.y,
      windowSize.w / cam.current.scale,
      windowSize.h / cam.current.scale,
      config.tileSize,
      activeTiles.current
    );
    if (cam.current.scale >= config.minTileLabelScale && !startedRef.current) {
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
  }, []);

  useEffect(() => {
    draw();
  }, [windowSize, started]);

  return {
    setAttributes,
    draw,
  };
}

export default useDrawer;
