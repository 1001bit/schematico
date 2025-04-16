import { useEffect, useState } from "react";
import { Layer, Stage } from "react-konva";
import GridLines from "./Grid";
import { KonvaEventObject, Node, NodeConfig } from "konva/lib/Node";
import Toolbar from "./Toolbar/Toolbar";
import Locator from "./Locator";
import TileMap from "./TileMap/TileMap";
import { ToolType } from "./Toolbar/Tool";
import { TileMapType } from "../project/interfaces";
import { mapDraw, mapWireDraw } from "./mapEdit";
import { Wire } from "./TileMap/Wire";
import { vector2 } from "./vector2";

interface GameProps {
  map: TileMapType;
}

export function Game(props: GameProps) {
  const tileSize = 30;

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const [scale, setScale] = useState(1);
  const maxScale = 5;
  const noGridScale = 0.4;
  const minScale = 0.1;

  const [camPos, setCamPos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseWorldPos = {
    x: (-camPos.x + mousePos.x) / scale,
    y: (-camPos.y + mousePos.y) / scale,
  };
  const mouseWorldTile = {
    x: Math.floor(mouseWorldPos.x / tileSize),
    y: Math.floor(mouseWorldPos.y / tileSize),
  };
  const [mouseDown, setMouseDown] = useState(false);

  const [currTool, setCurrTool] = useState<ToolType>(ToolType.Drag);
  const canDrag = currTool === ToolType.Drag;

  const [dragging, setDragging] = useState(false);

  const [map, setMap] = useState(props.map);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      });
    };
  }, []);

  function handleDragMove(e: KonvaEventObject<DragEvent, Node<NodeConfig>>) {
    const node = e.target;
    const x = node.x();
    const y = node.y();

    setCamPos({ x, y });
  }

  function handleWheel(e: KonvaEventObject<WheelEvent, Node<NodeConfig>>) {
    e.evt.preventDefault();
    const ampl = Math.abs(e.evt.deltaY / 100);
    const scaleBy = 1.1 * ampl;

    const newScale = e.evt.deltaY < 0 ? scale * scaleBy : scale / scaleBy;
    if (newScale > maxScale || newScale < minScale) return;

    const newPos = {
      x: -(mouseWorldPos.x - mousePos.x / newScale) * newScale,
      y: -(mouseWorldPos.y - mousePos.y / newScale) * newScale,
    };

    setScale(newScale);
    setCamPos(newPos);
  }

  function handleMouseMove(e: KonvaEventObject<MouseEvent, Node<NodeConfig>>) {
    const pointer = e.target.getStage()?.getPointerPosition();
    if (!pointer) return;
    setMousePos({ x: pointer?.x, y: pointer?.y });
  }

  const [wireStart, setWireStart] = useState<vector2 | undefined>(undefined);
  useEffect(() => {
    if (currTool != ToolType.Wire) {
      return;
    }

    mapWireDraw(
      mouseWorldTile,
      mouseDown,
      map,
      setMap,
      setWireStart,
      wireStart
    );
  }, [mouseDown]);

  useEffect(() => {
    mapDraw(setMap, mouseWorldTile, currTool, mouseDown);
  }, [mouseWorldTile, mouseDown]);

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
          ${canDrag ? (dragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"}
        `}
      >
        <Stage
          width={width}
          height={height}
          draggable={canDrag}
          onMouseMove={(e) => handleMouseMove(e)}
          onDragStart={(_e) => setDragging(true)}
          onDragMove={(e) => {
            handleDragMove(e);
            handleMouseMove(e);
          }}
          onMouseDown={(_) => setMouseDown(true)}
          onMouseUp={(_) => setMouseDown(false)}
          onDragEnd={(_e) => setDragging(false)}
          onWheel={(e) => handleWheel(e)}
          scaleX={scale}
          scaleY={scale}
          x={camPos.x}
          y={camPos.y}
        >
          <Layer>
            {scale > noGridScale && (
              <GridLines
                width={width / scale}
                height={height / scale}
                tile={tileSize}
                camX={-camPos.x / scale}
                camY={-camPos.y / scale}
              />
            )}
            <TileMap
              width={width / scale}
              height={height / scale}
              tileSize={tileSize}
              camPos={{ x: -camPos.x / scale, y: -camPos.y / scale }}
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
