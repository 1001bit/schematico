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

  const [currTool, setCurrTool] = useState<ToolType>(ToolType.Drag);

  const [cam, setCam] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });
  const maxScale = 5;
  const minGridScale = 0.3;
  const minScale = 0.1;

  const [mouseWorldTile, setMouseWorldTile] = useState({ x: 0, y: 0 });
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

  function onMouseMove(e: React.MouseEvent) {
    const pointer = { x: e.clientX, y: e.clientY };

    let camPos = {
      x: cam.x,
      y: cam.y,
    };
    if (draggingPos) {
      camPos.x = cam.x + (draggingPos.x - pointer.x) / cam.scale;
      camPos.y = cam.y + (draggingPos.y - pointer.y) / cam.scale;
      setCam({
        scale: cam.scale,
        x: camPos.x,
        y: camPos.y,
      });
      setDraggingPos(pointer);
    }

    const newMouseWorldTile = {
      x: Math.floor((camPos.x + pointer.x / cam.scale) / tileSize),
      y: Math.floor((camPos.y + pointer.y / cam.scale) / tileSize),
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

  function onMouseUp(_e: React.MouseEvent) {
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

  function onMouseDown(e: React.MouseEvent) {
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

  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    const pointer = { x: e.clientX, y: e.clientY };

    const scaleBy = 1.1 * Math.abs(e.deltaY / 100);

    const newScale = e.deltaY < 0 ? cam.scale * scaleBy : cam.scale / scaleBy;
    if (newScale > maxScale || newScale < minScale) return;

    const mouseWorldPos = {
      x: cam.x + pointer.x / cam.scale,
      y: cam.y + pointer.y / cam.scale,
    };

    setCam({
      scale: newScale,
      x: mouseWorldPos.x - pointer.x / newScale,
      y: mouseWorldPos.y - pointer.y / newScale,
    });
  }

  const drawCallback = useCallback(
    (_dt: number, ctx: CanvasRenderingContext2D) => {
      ctx.scale(cam.scale, cam.scale);
      if (cam.scale >= minGridScale)
        drawGrid(
          ctx,
          cam.x,
          cam.y,
          windowSize.w / cam.scale,
          windowSize.h / cam.scale,
          tileSize
        );

      drawTileMap(
        ctx,
        map,
        cam.x,
        cam.y,
        windowSize.w / cam.scale,
        windowSize.h / cam.scale,
        tileSize
      );
      ctx.scale(1 / cam.scale, 1 / cam.scale);
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
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onWheel={onWheel}
        drawCallback={drawCallback}
      ></Canvas>
    </>
  );
}

export default Game;
