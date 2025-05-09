import Toolbar, { ToolbarItem, ToolType } from "./Toolbar/Toolbar";
import Locator from "./Locator";
import Canvas from "./Canvas";
import { useMemo, useRef, useState } from "react";
import vector2, { vector2Equal, vector2ToStr } from "./vector2";
import { TileMapType, TileType } from "./tilemap";
import useCamera, { Camera } from "./Camera/camera";
import useWindowSize from "../hooks/window";
import useMapEditor from "./MapEditor/editor";
import useDrawer from "./Drawer/drawer";
import useDebouncedCallback from "../hooks/debouncedCallback";
import saveLocalProject from "../projectStorage/save";
import Button from "../components/Button/Button";
import useMapPlayer from "./MapPlayer/player";

interface GameProps {
  projectId: string;
  projectMap: TileMapType;
  projectCam: Camera;
}

function Game({ projectId, projectMap, projectCam }: GameProps) {
  // TileSize
  const tileSize = 30;

  // Game started
  const [started, setStarted] = useState(false);

  // Current toolbar item
  const [currItem, setCurrItem] = useState<ToolbarItem>({
    item: "tool",
    type: ToolType.Drag,
  });

  // Window
  const windowSize = useWindowSize();

  // Mouse Tile position
  const [mouseTile, setMouseTile] = useState({ x: 0, y: 0 });

  // Local Save
  const debounceSave = useDebouncedCallback(
    (saveMap: TileMapType, saveCam: Camera) => {
      saveLocalProject(projectId, saveMap, saveCam);
    },
    500
  );

  // Map
  const map = useRef(projectMap);

  // Draw
  const config = {
    minGridScale: 0.4,
    minTileLabelScale: 2,
    tileSize: tileSize,
  };
  const drawerHook = useDrawer(map.current, config, windowSize, started);

  // Camera
  function camUpdateCallback() {
    debounceSave(map.current, camHook.cam);
    drawerHook.draw();
  }
  const defCam = {
    scale: 1,
    x: 0,
    y: 0,
  };
  const camHook = useCamera(
    projectCam || defCam,
    [0.1, 5],
    1.1,
    camUpdateCallback
  );

  // Map Player
  function stateUpdateCallback() {
    drawerHook.draw();
  }
  const mapPlayerHook = useMapPlayer(
    map.current,
    mouseTile,
    stateUpdateCallback
  );

  // Map Editor
  function mapUpdateCallback(newWire?: [vector2, vector2]) {
    debounceSave(map.current, camHook.cam);
    drawerHook.draw(newWire);
  }
  const mapEditorHook = useMapEditor(
    map.current,
    mouseTile,
    currItem,
    mapUpdateCallback
  );

  // Mouse Move
  function onMouseMove(e: React.MouseEvent) {
    const pointer = { x: e.clientX, y: e.clientY };
    camHook.drag(pointer);

    const newMouseTile = {
      x: Math.floor((camHook.cam.x + pointer.x / camHook.cam.scale) / tileSize),
      y: Math.floor((camHook.cam.y + pointer.y / camHook.cam.scale) / tileSize),
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
      const pointingTile = map.current[vector2ToStr(mouseTile)];
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

  // Play button press
  function switchMode() {
    setStarted((s) => !s);
    mapPlayerHook.clear();
  }

  // Cursor
  const cursorStyle = useMemo(() => {
    if (camHook.dragging) return "cursor-grabbing";

    if (!started) {
      if (currItem.type === ToolType.Drag) return "cursor-grab";
    } else {
      const pointingTile = map.current[vector2ToStr(mouseTile)];
      if (pointingTile && pointingTile.type === TileType.Input)
        return "cursor-pointer";
      return "cursor-grab";
    }

    return "cursor-default";
  }, [camHook.dragging, currItem, started, mouseTile]);

  // init ctx
  function init(ctx: CanvasRenderingContext2D) {
    drawerHook.setAttributes(ctx, camHook.cam, mapPlayerHook.activeTiles);
    drawerHook.draw();
  }
  return (
    <>
      {!started && (
        <Toolbar
          currItem={currItem}
          onSelect={setCurrItem}
          className="
          sm:bottom-2
          bottom-15
          absolute left-1/2 z-6 -translate-x-1/2
        "
        />
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
      <Button onClick={switchMode} className="fixed right-5 bottom-2">
        {started ? "edit" : "play"}
      </Button>
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
