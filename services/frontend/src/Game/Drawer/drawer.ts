import { useEffect, useRef } from "react";
import { Camera } from "../Camera/camera";
import { TileMapType } from "../tilemap";
import drawGrid from "./grid";
import { drawTileLabels, drawTileMap, drawWires } from "./tilemap";
import drawGhostWire from "./ghostWire";
import vector2 from "../vector2";

function useDrawer(
  initCtx: CanvasRenderingContext2D | undefined,
  initCam: Camera,
  initMap: TileMapType,

  config: {
    minGridScale: number;
    minTileLabelScale: number;
    tileSize: number;
    bgColor?: string;
  },

  windowSize: { w: number; h: number },
  started: boolean
) {
  const ctx = useRef(initCtx);
  const cam = useRef(initCam);
  const map = useRef(initMap);

  const draw = (
    newCam?: Camera,
    newMap?: TileMapType,
    newWire?: [vector2, vector2]
  ) => {
    if (newCam) cam.current = newCam;
    if (newMap) map.current = newMap;

    if (!ctx.current) return;

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
      map.current,
      cam.current.x,
      cam.current.y,
      windowSize.w / cam.current.scale,
      windowSize.h / cam.current.scale,
      config.tileSize
    );
    drawWires(
      ctx.current,
      map.current,
      cam.current.x,
      cam.current.y,
      windowSize.w / cam.current.scale,
      windowSize.h / cam.current.scale,
      config.tileSize
    );
    if (cam.current.scale >= config.minTileLabelScale && !started)
      drawTileLabels(
        ctx.current,
        map.current,
        cam.current.x,
        cam.current.y,
        windowSize.w / cam.current.scale,
        windowSize.h / cam.current.scale,
        config.tileSize
      );

    if (newWire) {
      const [start, end] = newWire;
      drawGhostWire(
        ctx.current,
        map.current,
        start,
        end,
        cam.current.x,
        cam.current.y,
        config.tileSize
      );
    }

    ctx.current.scale(1 / cam.current.scale, 1 / cam.current.scale);
  };

  useEffect(() => {
    draw(undefined, undefined, undefined);
  }, [windowSize, started]);

  const setCtx = (newCtx: CanvasRenderingContext2D) => {
    ctx.current = newCtx;
  };

  return {
    draw,
    setCtx,
  };
}

export default useDrawer;
