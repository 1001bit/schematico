import { TileMapType } from "../../project/interfaces";
import { strToVector2, vector2 } from "../vector2";
import Tile from "./Tile";
import Wire from "./Wire";
import { useMemo } from "react";

interface TileMapProps {
  w: number;
  h: number;
  x: number;
  y: number;
  tileSize: number;
  map: TileMapType;
}

function containsPoint(start: vector2, end: vector2, point: vector2) {
  return (
    point.x >= start.x &&
    point.y >= start.y &&
    point.x <= end.x &&
    point.y <= end.y
  );
}

function containsLine(
  start: vector2,
  end: vector2,
  lineStart: vector2,
  lineEnd: vector2
) {
  return (
    Math.max(lineStart.x, lineEnd.x) >= start.x &&
    Math.max(lineStart.y, lineEnd.y) >= start.y &&
    Math.min(lineStart.x, lineEnd.x) <= end.x &&
    Math.min(lineStart.y, lineEnd.y) <= end.y
  );
}

function TileMap({ w, h, x, y, tileSize, map }: TileMapProps) {
  const { tiles, wires } = useMemo(() => {
    const start = {
      x: x / tileSize - 1,
      y: y / tileSize - 1,
    };
    const end = {
      x: start.x + w / tileSize + 1,
      y: start.y + h / tileSize + 1,
    };

    const tiles = [];
    const wires = [];

    for (const [posStr, tile] of Object.entries(map)) {
      const pos = strToVector2(posStr);

      if (containsPoint(start, end, pos)) {
        tiles.push(
          <Tile
            pos={{ x: pos.x, y: pos.y }}
            tileSize={tileSize}
            tile={tile}
            key={`${pos.x}-${pos.y}`}
          />
        );
      }

      for (const [wireEndStr, _] of Object.entries(tile.connections)) {
        const wireEnd = strToVector2(wireEndStr);

        if (!containsLine(start, end, pos, wireEnd)) {
          continue;
        }
        wires.push(
          <Wire
            start={pos}
            end={wireEnd}
            tileSize={tileSize}
            key={`${pos.x}-${pos.y}-${wireEnd.x}-${wireEnd.y}`}
          />
        );
      }
    }

    return { tiles, wires };
  }, [x, y, w, h, map]);

  return (
    <>
      {tiles}
      {wires}
    </>
  );
}

export default TileMap;
