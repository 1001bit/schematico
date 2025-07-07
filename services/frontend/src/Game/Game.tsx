import Toolbar, { ToolbarItem, ToolType } from "./Toolbar/Toolbar";
import Locator from "./Locator";
import Canvas from "./Canvas";
import { useEffect, useMemo, useState } from "react";
import vector2, { vector2Equal, vector2ToStr } from "./vector2";
import { TileType } from "./tilemap";
import useCamera from "./Camera/camera";
import useWindowSize from "../hooks/window";
import useMapEditor from "./MapEditor/editor";
import useDrawer from "./Drawer/drawer";
import useMapPlayer from "./MapPlayer/player";
import Slider from "./Slider";
import { ProjectInterface } from "../projectManager/project";

interface GameProps {
  project: ProjectInterface;
  setProject: (p: ProjectInterface) => void;
  started: boolean;
}

function Game({ project, setProject, started }: GameProps) {
  // TileSize
  const tileSize = 30;

  // Current toolbar item
  const [currItem, setCurrItem] = useState<ToolbarItem>({
    item: "tool",
    type: ToolType.Drag,
  });

  // TPS
  const [tps, setTps] = useState(10);
  const tpsMin = 1;
  const tpsMax = 150;
  const tpsStep = 1;

  // Window
  const windowSize = useWindowSize();

  // Mouse Tile position
  const [mouseTile, setMouseTile] = useState({ x: 0, y: 0 });

  // Draw
  const config = {
    minGridScale: 0.4,
    minTileLabelScale: 1.5,
    tileSize: tileSize,
  };
  const drawerHook = useDrawer(project.map, config, windowSize, started);

  // Camera
  function camUpdateCallback() {
    setProject({
      ...project,
      camera: project.camera,
    });
    drawerHook.draw();
  }
  const camHook = useCamera(project.camera, [0.1, 5], 1.1, camUpdateCallback);

  // Map Player
  function stateUpdateCallback() {
    drawerHook.draw();
  }
  const mapPlayerHook = useMapPlayer(
    project.map,
    mouseTile,
    tps,
    stateUpdateCallback
  );

  useEffect(() => {
    started ? mapPlayerHook.start() : mapPlayerHook.stop();
    drawerHook.draw();
  }, [started]);

  // Map Editor
  function mapUpdateCallback(newWire?: [vector2, vector2]) {
    setProject({
      ...project,
      map: project.map,
    });
    drawerHook.draw(newWire);
  }
  const mapEditorHook = useMapEditor(
    project.map,
    mouseTile,
    currItem,
    mapUpdateCallback
  );

  // Mouse Move
  function onMouseMove(e: React.MouseEvent) {
    const pointer = { x: e.clientX, y: e.clientY };
    camHook.drag(pointer);

    const newMouseTile = {
      x: Math.floor(
        (project.camera.x + pointer.x / project.camera.scale) / tileSize
      ),
      y: Math.floor(
        (project.camera.y + pointer.y / project.camera.scale) / tileSize
      ),
    };

    if (!vector2Equal(mouseTile, newMouseTile)) setMouseTile(newMouseTile);
  }

  // Mouse Up
  function onMouseUp(_e: React.MouseEvent) {
    camHook.stopDrag();
    if (!started) mapEditorHook.onMouseUp();
  }

  // Mouse Down
  function onMouseDown(e: React.MouseEvent) {
    const pointer = { x: e.clientX, y: e.clientY };

    if (!started) {
      if (e.button === 1 || currItem.type === ToolType.Drag) {
        camHook.startDrag(pointer);
      } else {
        mapEditorHook.onMouseDown();
      }
    } else {
      const pointingTile = project.map[vector2ToStr(mouseTile)];
      if (!pointingTile || pointingTile.type !== TileType.Input)
        camHook.startDrag(pointer);
      mapPlayerHook.onMouseDown();
    }
  }

  // Wheel Scroll
  function onWheel(e: React.WheelEvent) {
    const pointer = { x: e.clientX, y: e.clientY };
    camHook.zoom(pointer, e.deltaY);
  }

  // Cursor
  const cursorStyle = useMemo(() => {
    if (camHook.dragging) return "cursor-grabbing";

    if (!started) {
      if (currItem.type === ToolType.Drag) return "cursor-grab";
    } else {
      const pointingTile = project.map[vector2ToStr(mouseTile)];
      if (pointingTile && pointingTile.type === TileType.Input)
        return "cursor-pointer";
      return "cursor-grab";
    }

    return "cursor-default";
  }, [camHook.dragging, currItem, started, mouseTile]);

  // init ctx
  function init(ctx: CanvasRenderingContext2D) {
    drawerHook.setAttributes(ctx, project.camera, mapPlayerHook.getState);
    drawerHook.draw();
  }
  return (
    <>
      {!started && (
        <Toolbar
          currItem={currItem}
          onSelect={setCurrItem}
          className="
            bottom-2 absolute left-1/2 z-6 -translate-x-1/2
          "
        />
      )}
      {started && (
        <Slider
          min={tpsMin}
          max={tpsMax}
          step={tpsStep}
          initial={tps}
          onChange={setTps}
          label="tps: "
          className="
            bottom-2 absolute left-1/2 z-6 -translate-x-1/2
          "
        ></Slider>
      )}
      <Locator
        x={mouseTile.x}
        y={mouseTile.y}
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
          ${cursorStyle}
        `}
        ctxCallback={(ctx) => init(ctx)}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onWheel={onWheel}
      ></Canvas>
    </>
  );
}

export default Game;
