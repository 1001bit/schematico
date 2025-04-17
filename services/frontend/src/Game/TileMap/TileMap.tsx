import { memo } from "react";
import { TileMapType } from "../../project/interfaces";
import { strToVector2, vector2 } from "../vector2";
import Tile from "./Tile";
import Wire from "./Wire";

interface TileMapProps {
  width: number;
  height: number;
  camPos: vector2;
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

function TileMap({ width, height, camPos, tileSize, map }: TileMapProps) {
  const start = {
    x: camPos.x / tileSize - 1,
    y: camPos.y / tileSize - 1,
  };
  const end = {
    x: start.x + width / tileSize + 1,
    y: start.y + height / tileSize + 1,
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

  return (
    <>
      {tiles}
      {wires}
    </>
  );
}

export default memo(TileMap);
