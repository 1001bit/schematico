import Toolbar from "./Toolbar/Toolbar";
import Locator from "./Locator";
import { ToolType } from "./Toolbar/Tool";
import { ProjectInterface } from "../project/interfaces";
import { Canvas } from "./Canvas";
import { useCallback, useEffect, useRef, useState } from "react";
import { drawTileMap } from "./mapDraw";
import { mapEdit, mapEndWire, mapStartWire } from "./mapEdit";
import { vector2 } from "./vector2";

interface GameProps {
  project: ProjectInterface;
}

export function Game({ project }: GameProps) {
  const tileSize = 30;
  const [windowSize, setWindowSize] = useState({
    w: innerWidth,
    h: innerHeight,
  });
  const cam = useRef({
    scale: 1,
    x: 0,
    y: 0,
  });
  const [mouseWorldTile, setMouseWorldTile] = useState({ x: 0, y: 0 });
  const [currTool, setCurrTool] = useState<ToolType>(ToolType.Drag);
  const mouseDown = useRef(false);
  const wireStart = useRef<vector2 | undefined>(undefined);

  useEffect(() => {
    const resize = () => {
      setWindowSize({
        w: innerWidth,
        h: innerHeight,
      });
    };

    window.addEventListener("resize", () => resize());
    return window.removeEventListener("resize", () => resize());
  }, []);

  function handleMouseMove(e: React.MouseEvent) {
    const pointer = { x: e.clientX, y: e.clientY };
    if (!pointer) return;

    const newMouseWorldTile = {
      x: Math.floor(
        (-cam.current.x + pointer.x) / cam.current.scale / tileSize
      ),
      y: Math.floor(
        (-cam.current.y + pointer.y) / cam.current.scale / tileSize
      ),
    };

    if (
      newMouseWorldTile.x !== mouseWorldTile.x ||
      newMouseWorldTile.y !== mouseWorldTile.y
    ) {
      setMouseWorldTile(newMouseWorldTile);
    }

    if (mouseDown.current) {
      map.current = mapEdit(map.current, mouseWorldTile, currTool);
    }
  }

  function handleMouseUp(_e: React.MouseEvent) {
    if (currTool === ToolType.Wire) {
      map.current = mapEndWire(map.current, mouseWorldTile, wireStart.current);
    }

    mouseDown.current = false;
  }

  function handleMouseDown(_e: React.MouseEvent) {
    if (currTool === ToolType.Wire) {
      mapStartWire(map.current, mouseWorldTile, wireStart.current);
    } else {
      map.current = mapEdit(map.current, mouseWorldTile, currTool);
    }

    mouseDown.current = true;
  }

  const map = useRef(project.map);
  const draw = useCallback(
    (_dt: number, ctx: CanvasRenderingContext2D) => {
      drawTileMap(
        ctx,
        map.current,
        cam.current.x,
        cam.current.y,
        windowSize.w,
        windowSize.h,
        tileSize
      );
    },
    [map.current, cam.current, windowSize]
  );

  return (
    <>
      <Toolbar
        currTool={currTool}
        onSelect={setCurrTool}
        className="
          sm:bottom-2
          bottom-15
          absolute left-1/2 z-6 -translate-x-1/2
        "
      />
      <Locator
        x={mouseWorldTile.x}
        y={mouseWorldTile.y}
        className="
          sm:top-2
          top-15
          absolute left-1/2 z-6 -translate-x-1/2
        "
      />
      <Canvas
        w={windowSize.w}
        h={windowSize.h}
        bgColor="#000000"
        className={`
          fixed left-0 top-0 z-0
        `}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        draw={draw}
      ></Canvas>
    </>
  );
}
