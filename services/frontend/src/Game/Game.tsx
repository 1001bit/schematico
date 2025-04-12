import { useEffect, useState } from "react";
import { Layer, Rect, Stage } from "react-konva";
import GridLines from "./Grid";
import { KonvaEventObject, Node, NodeConfig } from "konva/lib/Node";
import Toolbar, { ToolType } from "./Toolbar/Toolbar";

export function Game() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const [scale, setScale] = useState(1);
  const maxScale = 5;
  const noGridScale = 0.4;
  const minScale = 0.1;

  const [pos, setPos] = useState({ x: 0, y: 0 });

  const [tool, setTool] = useState<ToolType>(ToolType.Drag);
  const canDrag = tool === ToolType.Drag;

  const [dragging, setDragging] = useState(false);
  function setDraggingState(dragging: boolean) {
    setDragging(dragging);
  }

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

    setPos({ x, y });
  }

  function handleWheel(e: KonvaEventObject<WheelEvent, Node<NodeConfig>>) {
    e.evt.preventDefault();
    const oldScale = scale;
    const ampl = Math.abs(e.evt.deltaY / 100);
    const scaleBy = 1.1 * ampl;
    const pointer = e.target.getStage()?.getPointerPosition();
    if (!pointer) return;

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    if (newScale > maxScale || newScale < minScale) return;

    const zoomTo = {
      x: (-pos.x + pointer.x) / oldScale,
      y: (-pos.y + pointer.y) / oldScale,
    };

    setScale(newScale);

    const newPos = {
      x: -(zoomTo.x - pointer.x / newScale) * newScale,
      y: -(zoomTo.y - pointer.y / newScale) * newScale,
    };

    setPos(newPos);
  }

  return (
    <>
      <Toolbar currTool={tool} onSelect={setTool} className="bottom-0 py-2" />
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
          onDragStart={(_e) => setDraggingState(true)}
          onDragMove={(e) => handleDragMove(e)}
          onDragEnd={(_e) => setDraggingState(false)}
          onWheel={(e) => handleWheel(e)}
          scaleX={scale}
          scaleY={scale}
          x={pos.x}
          y={pos.y}
        >
          <Layer>
            {scale > noGridScale && (
              <GridLines
                width={width / scale}
                height={height / scale}
                tile={30}
                camX={-pos.x / scale}
                camY={-pos.y / scale}
              ></GridLines>
            )}
            <Rect x={10} y={10} width={100} height={100} fill={"red"}></Rect>
          </Layer>
        </Stage>
      </div>
    </>
  );
}
