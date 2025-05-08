import Toolbar, { ToolType } from "./Toolbar/Toolbar";
import Locator from "./Locator";
import Canvas from "./Canvas";
import { useMemo, useState } from "react";
import vector2, { vector2Equal } from "./vector2";
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
  const [started, setStarted] = useState(false);

  // TileSize
  const tileSize = 30;

  // CurrTool
  const [currTool, setCurrTool] = useState<ToolType>(ToolType.Drag);

  // Window
  const windowSize = useWindowSize();

  // Mouse Tile position
  const [mouseTile, setMouseTile] = useState({ x: 0, y: 0 });

  // Draw
  const config = {
    minGridScale: 0.4,
    minTileLabelScale: 0.7,
    tileSize: tileSize,
  };
  const drawerHook = useDrawer(
    undefined,
    projectCam,
    projectMap,
    config,
    windowSize,
    started
  );

  // Play
  const mapPlayer = useMapPlayer(projectMap, mouseTile);

  // Local Save
  const debounceSave = useDebouncedCallback(
    (map?: TileMapType, cam?: Camera) => {
      saveLocalProject(projectId, map, cam);
    },
    500
  );

  // Camera
  function camUpdateCallback(cam: Camera) {
    debounceSave(undefined, cam);
    drawerHook.draw(cam, undefined, undefined);
  }

  const camHook = useCamera(
    projectCam || {
      scale: 1,
      x: 0,
      y: 0,
    },
    [0.1, 5],
    1.1,
    camUpdateCallback
  );

  // Map Edit
  function mapUpdateCallback(
    newMap?: TileMapType,
    newNewWire?: [vector2, vector2]
  ) {
    debounceSave(newMap, undefined);
    drawerHook.draw(undefined, newMap, newNewWire);
    if (newMap) mapPlayer.setMap(newMap);
  }

  const mapEditorHook = useMapEditor(
    projectMap,
    mouseTile,
    currTool,
    !started,
    mapUpdateCallback
  );

  // Mouse Move
  function onMouseMove(e: React.MouseEvent) {
    const pointer = { x: e.clientX, y: e.clientY };

    camHook.drag(pointer);

    const newMouseTile = {
      x: Math.floor(
        (camHook.getPos().x + pointer.x / camHook.getScale()) / tileSize
      ),
      y: Math.floor(
        (camHook.getPos().y + pointer.y / camHook.getScale()) / tileSize
      ),
    };

    if (!vector2Equal(mouseTile, newMouseTile)) {
      setMouseTile(newMouseTile);
    }
  }
  // Mouse Up
  function onMouseUp(_e: React.MouseEvent) {
    camHook.stopDrag();

    if (!started) {
      mapEditorHook.onMouseUp();
    }
  }
  // Mouse Down
  function onMouseDown(e: React.MouseEvent) {
    const pointer = { x: e.clientX, y: e.clientY };

    if (!started) {
      if (e.button === 1 || currTool === ToolType.Drag) {
        camHook.startDrag(pointer);
      } else {
        mapEditorHook.onMouseDown();
      }
    } else {
      if (
        !mapPlayer.pointingTile ||
        mapPlayer.pointingTile.type !== TileType.Input
      )
        camHook.startDrag(pointer);
    }
  }
  // Wheel Scroll
  function onWheel(e: React.WheelEvent) {
    const pointer = { x: e.clientX, y: e.clientY };
    camHook.zoom(pointer, e.deltaY);
  }

  function init(ctx: CanvasRenderingContext2D) {
    drawerHook.setCtx(ctx);
    drawerHook.draw();
  }

  // Cursor
  const cursorStyle = useMemo(() => {
    if (camHook.dragging) {
      return "cursor-grabbing";
    }
    if (!started) {
      if (currTool === ToolType.Drag) {
        return "cursor-grab";
      }
    } else {
      if (
        mapPlayer.pointingTile &&
        mapPlayer.pointingTile.type === TileType.Input
      ) {
        return "cursor-pointer";
      }
      return "cursor-grab";
    }

    return "cursor-default";
  }, [camHook.dragging, currTool, started, mouseTile]);

  return (
    <>
      {!started && (
        <Toolbar
          currTool={currTool}
          onSelect={setCurrTool}
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
      <Button
        onClick={() => setStarted((s) => !s)}
        className="fixed right-5 bottom-2"
      >
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
