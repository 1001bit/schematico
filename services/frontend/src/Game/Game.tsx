import Toolbar from "./Toolbar/Toolbar";
import Locator from "./Locator";
import { ToolType } from "./Toolbar/Tool";
import { ProjectInterface } from "../project/interfaces";
import { Canvas } from "./Canvas";
import { useEffect, useState } from "react";

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
  const [mouseWorldTile, setMouseWorldTile] = useState({ x: 0, y: 0 });
  const [currTool, setCurrTool] = useState<ToolType>(ToolType.Drag);

  useEffect(() => {
    const resize = () =>
      setCam((c) => ({ ...c, w: innerWidth, h: innerHeight }));
    window.addEventListener("resize", resize);
    return window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {}, []);

  function handleMouseMove(e: React.MouseEvent) {
    const pointer = { x: e.clientX, y: e.clientY };
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
      <Canvas
        map={project.map}
        id={project.id}
        w={cam.w}
        h={cam.h}
        className={`
          fixed left-0 top-0 z-0
        `}
        onMouseMove={handleMouseMove}
      ></Canvas>
    </>
  );
}
