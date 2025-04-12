import { Rect } from "react-konva";
import { Tile } from "./tile";

interface TileMapProps {
  width: number;
  height: number;
  camX: number;
  camY: number;
  tile: number;
  map: Map<{ x: number; y: number }, Tile>;
}

export default function TileMap(props: TileMapProps) {
  const { width, height, camX, camY, tile, map } = props;

  const xStart = camX / tile - 1;
  const yStart = camY / tile - 1;
  const xEnd = xStart + width / tile + 1;
  const yEnd = yStart + height / tile + 1;

  const tiles = [];

  for (const [key, val] of map) {
    if (key.x < xStart || key.x > xEnd || key.y < yStart || key.y > yEnd) {
      continue;
    }
    const a = Math.floor((val.state ? 1 : 0.5) * 255).toString(16);
    tiles.push(
      <Rect
        key={`${key.x}-${key.y}`}
        x={key.x * tile}
        y={key.y * tile}
        width={tile}
        height={tile}
        fill={val.type + a}
      />
    );
  }

  return <>{tiles}</>;
}
