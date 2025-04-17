import { useEffect, useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import GridLines from "./GridLines";
import { KonvaEventObject, Node, NodeConfig } from "konva/lib/Node";
import Toolbar from "./Toolbar/Toolbar";
import Locator from "./Locator";
import TileMap from "./TileMap/TileMap";
import { ToolType } from "./Toolbar/Tool";
import { mapDraw, mapWireDraw } from "./mapEdit";
import Wire from "./TileMap/Wire";
import { vector2 } from "./vector2";
import { saveLocalMap } from "../project/save";
import { ProjectInterface } from "../project/interfaces";

interface GameProps {
  project: ProjectInterface;
}

export function Game({ project }: GameProps) {
  const tileSize = 30;

  const [cam, setCam] = useState({
    scale: 1,
    x: 0,
    y: 0,
    w: innerWidth,
    h: innerHeight,
  });
  const maxScale = 5;
  const noGridScale = 0.4;
  const minScale = 0.1;

  const [mouseWorldTile, setMouseWorldTile] = useState({ x: 0, y: 0 });
  const mouseDown = useRef(false);
  const [dragging, setDragging] = useState(false);

  const [currTool, setCurrTool] = useState<ToolType>(ToolType.Drag);

  const [map, setMap] = useState(project.map);

  const drawPendingRef = useRef(false);

  useEffect(() => {
    const handleResize = () =>
      setCam((c) => ({ ...c, w: innerWidth, h: innerHeight }));

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleDragMove(e: KonvaEventObject<DragEvent, Node<NodeConfig>>) {
    const node = e.target;

    setCam((c) => ({
      ...c,
      x: node.x(),
      y: node.y(),
    }));
  }

  function handleWheel(e: KonvaEventObject<WheelEvent, Node<NodeConfig>>) {
    e.evt.preventDefault();
    const pointer = e.target.getStage()!.getPointerPosition();
    if (!pointer) return;

    const scaleBy = 1.1 * Math.abs(e.evt.deltaY / 100);

    const newScale =
      e.evt.deltaY < 0 ? cam.scale * scaleBy : cam.scale / scaleBy;
    if (newScale > maxScale || newScale < minScale) return;

    const mouseWorldPos = {
      x: (pointer.x - cam.x) / cam.scale,
      y: (pointer.y - cam.y) / cam.scale,
    };

    setCam({
      scale: newScale,
      x: pointer.x - mouseWorldPos.x * newScale,
      y: pointer.y - mouseWorldPos.y * newScale,
      w: cam.w,
      h: cam.h,
    });
  }

  function handleMouseMove(e: KonvaEventObject<MouseEvent, Node<NodeConfig>>) {
    const pointer = e.target.getStage()!.getPointerPosition();
    if (!pointer) return;

    const newMouseWorldTile = {
      x: Math.floor((-cam.x + pointer.x) / cam.scale / tileSize),
      y: Math.floor((-cam.y + pointer.y) / cam.scale / tileSize),
    };

    if (
      newMouseWorldTile.x !== mouseWorldTile.x ||
      newMouseWorldTile.y !== mouseWorldTile.y
    ) {
      setMouseWorldTile(newMouseWorldTile);
    }

    if (drawPendingRef.current) return;
    drawPendingRef.current = true;
    requestAnimationFrame(() => {
      drawPendingRef.current = false;
      if (currTool === ToolType.Wire) {
        mapWireDraw(
          mouseWorldTile,
          mouseDown.current,
          map,
          setMap,
          setWireStart,
          wireStart
        );
      } else {
        mapDraw(map, setMap, mouseWorldTile, currTool, mouseDown.current);
      }
    });
  }

  const [wireStart, setWireStart] = useState<vector2 | undefined>(undefined);

  useEffect(() => {
    const timeout = setTimeout(() => {
      saveLocalMap(project.id, map);
    }, 500);

    return () => clearTimeout(timeout);
  }, [map]);

  function onMouseDown() {
    mouseDown.current = true;
  }
  function onMouseUp() {
    mouseDown.current = false;
  }
  function onDragMove(e: KonvaEventObject<DragEvent>) {
    handleDragMove(e);
    handleMouseMove(e);
  }
  function onDragStart() {
    setDragging(true);
  }
  function onDragEnd() {
    setDragging(false);
  }

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

      <div
        className={`
          fixed left-0 top-0 z-0
          ${currTool === ToolType.Drag ? (dragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"}
        `}
      >
        <Stage
          width={cam.w}
          height={cam.h}
          draggable={currTool === ToolType.Drag}
          onMouseMove={handleMouseMove}
          onDragStart={onDragStart}
          onDragMove={onDragMove}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onDragEnd={onDragEnd}
          onWheel={handleWheel}
          scaleX={cam.scale}
          scaleY={cam.scale}
          x={cam.x}
          y={cam.y}
        >
          <Layer>
            {cam.scale > noGridScale && (
              <GridLines
                width={cam.w / cam.scale}
                height={cam.h / cam.scale}
                tile={tileSize}
                camX={-cam.x / cam.scale}
                camY={-cam.y / cam.scale}
              />
            )}
            <TileMap
              width={cam.w / cam.scale}
              height={cam.h / cam.scale}
              tileSize={tileSize}
              camPos={{ x: -cam.x / cam.scale, y: -cam.y / cam.scale }}
              map={map}
            />
            {wireStart && (
              <Wire
                start={wireStart}
                end={mouseWorldTile}
                tileSize={tileSize}
              />
            )}
          </Layer>
        </Stage>
      </div>
    </>
  );
}
