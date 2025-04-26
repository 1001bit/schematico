import Toolbar from "./Toolbar/Toolbar";
import Locator from "./Locator";
import { ToolType } from "./Toolbar/Tool";
import { ProjectInterface } from "../project/interfaces";
import Canvas from "./Canvas";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import drawTileMap from "./Draw/tilemap";
import { mapEdit } from "./mapEdit";
import vector2 from "./vector2";
import drawGrid from "./Draw/grid";

interface GameProps {
  project: ProjectInterface;
}

function Game({ project }: GameProps) {
  const tileSize = 30;
  const [windowSize, setWindowSize] = useState({
    w: innerWidth,
    h: innerHeight,
  });
  const [cam, setCam] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });
  const [mouseWorldTile, setMouseWorldTile] = useState({ x: 0, y: 0 });
  const [currTool, setCurrTool] = useState<ToolType>(ToolType.Drag);
  const mouseDown = useRef(false);

  const [map, setMap] = useState(project.map);

  const [draggingPos, setDraggingPos] = useState<vector2 | undefined>(
    undefined
  );
  const canDrag = useMemo(() => currTool === ToolType.Drag, [currTool]);
  useEffect(() => {
    if (!canDrag && draggingPos) setDraggingPos(undefined);
  }, [canDrag]);

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

    let camPos = {
      x: cam.x,
      y: cam.y,
    };
    if (draggingPos) {
      camPos.x = cam.x + draggingPos.x - pointer.x;
      camPos.y = cam.y + draggingPos.y - pointer.y;
      setCam({
        scale: cam.scale,
        x: camPos.x,
        y: camPos.y,
      });
      setDraggingPos(pointer);
    }

    const newMouseWorldTile = {
      x: Math.floor((camPos.x + pointer.x) / cam.scale / tileSize),
      y: Math.floor((camPos.y + pointer.y) / cam.scale / tileSize),
    };

    if (
      newMouseWorldTile.x === mouseWorldTile.x &&
      newMouseWorldTile.y === mouseWorldTile.y
    ) {
      return;
    }
    setMouseWorldTile(newMouseWorldTile);
    if (mouseDown.current) {
      setMap(mapEdit(map, newMouseWorldTile, currTool));
    }
  }

  function handleMouseUp(_e: React.MouseEvent) {
    switch (currTool) {
      case ToolType.Wire:
        break;
      case ToolType.Drag:
        setDraggingPos(undefined);
        break;
      default:
        break;
    }

    mouseDown.current = false;
  }

  function handleMouseDown(e: React.MouseEvent) {
    switch (currTool) {
      case ToolType.Wire:
        break;
      case ToolType.Drag:
        setDraggingPos({ x: e.clientX, y: e.clientY });
        break;
      default:
        setMap(mapEdit(map, mouseWorldTile, currTool));
        break;
    }

    mouseDown.current = true;
  }

  const drawCallback = useCallback(
    (_dt: number, ctx: CanvasRenderingContext2D) => {
      drawGrid(ctx, cam.x, cam.y, windowSize.w, windowSize.h, tileSize);
      drawTileMap(ctx, map, cam.x, cam.y, windowSize.w, windowSize.h, tileSize);
    },
    [map, cam, windowSize]
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
          ${canDrag ? (draggingPos ? "cursor-grabbing" : "cursor-grab") : ""}
        `}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        drawCallback={drawCallback}
      ></Canvas>
    </>
  );
}

export default Game;
