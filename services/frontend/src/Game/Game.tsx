import Toolbar from "./Toolbar/Toolbar";
import Locator from "./Locator";
import { ToolType } from "./interfaces";
import Canvas from "./Canvas";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { drawTileMap, drawTileLabels, drawWires } from "./Draw/tilemap";
import mapTilesEdit from "./Edit/tiles";
import vector2 from "./vector2";
import drawGrid from "./Draw/grid";
import { Camera, TileMapType } from "./interfaces";
import placeWire from "./Edit/wire";
import drawGhostWire from "./Draw/ghostWire";
import saveLocalProject from "../projectStorage/save";

interface GameProps {
  projectId: string;
  projectMap: TileMapType;
  camera: Camera;
}

function Game({ projectId, projectMap, camera }: GameProps) {
  // TileSize
  const tileSize = 30;

  // CurrTool
  const [currTool, setCurrTool] = useState<ToolType>(ToolType.Drag);

  // Window
  const [windowSize, setWindowSize] = useState({
    w: innerWidth,
    h: innerHeight,
  });
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

  // Camera
  const [cam, setCam] = useState(
    camera || {
      scale: 1,
      x: 0,
      y: 0,
    }
  );
  const maxScale = 5;
  const minGridScale = 0.3;
  const minTileTextScale = 0.7;
  const minScale = 0.1;

  // Mouse
  const [mouseWorldTile, setMouseWorldTile] = useState({ x: 0, y: 0 });
  const mouseDown = useRef(false);
  // Drag
  const [draggingPos, setDraggingPos] = useState<vector2 | undefined>(
    undefined
  );
  const canDrag = useMemo(() => currTool === ToolType.Drag, [currTool]);
  useEffect(() => {
    if (!canDrag && draggingPos) setDraggingPos(undefined);
  }, [canDrag]);

  // Wire Edit
  const [wireStartTile, setWireStartTile] = useState<vector2 | undefined>(
    undefined
  );
  const [wireEndTile, setWireEndTile] = useState<vector2 | undefined>(
    undefined
  );

  // Map
  const [map, setMap] = useState(projectMap);

  // Mouse Move
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
      setMap(mapTilesEdit(map, newMouseWorldTile, currTool));
      if (currTool == ToolType.Wire) {
        setWireEndTile(newMouseWorldTile);
      }
    }
  }
  // Mouse Up
  function onMouseUp(e: React.MouseEvent) {
    if (e.button === 1 || currTool === ToolType.Drag) {
      setDraggingPos(undefined);
    } else if (currTool === ToolType.Wire) {
      if (wireStartTile && wireEndTile) {
        setMap(placeWire(map, wireStartTile, wireEndTile));
        setWireStartTile(undefined);
        setWireEndTile(undefined);
      }
    }

    mouseDown.current = false;
  }
  // Mouse Down
  function onMouseDown(e: React.MouseEvent) {
    const pointer = { x: e.clientX, y: e.clientY };

    if (e.button === 1 || currTool === ToolType.Drag) {
      setDraggingPos(pointer);
    } else if (currTool === ToolType.Wire) {
      setWireStartTile(mouseWorldTile);
      setWireEndTile(mouseWorldTile);
    } else {
      setMap(mapTilesEdit(map, mouseWorldTile, currTool));
    }

    mouseDown.current = true;
  }
  // Wheel Scroll
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

  // Draw
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
      drawWires(
        ctx,
        map,
        cam.x,
        cam.y,
        windowSize.w / cam.scale,
        windowSize.h / cam.scale,
        tileSize
      );
      if (cam.scale >= minTileTextScale)
        drawTileLabels(
          ctx,
          map,
          cam.x,
          cam.y,
          windowSize.w / cam.scale,
          windowSize.h / cam.scale,
          tileSize
        );

      if (wireStartTile && wireEndTile)
        drawGhostWire(
          ctx,
          map,
          wireStartTile,
          wireEndTile,
          cam.x,
          cam.y,
          tileSize
        );

      ctx.scale(1 / cam.scale, 1 / cam.scale);
    },
    [map, cam, windowSize, wireEndTile]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      saveLocalProject(projectId, map, cam);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [map, cam]);

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
          ${draggingPos && "cursor-grabbing"}
          ${canDrag && !draggingPos && "cursor-grab"}
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
