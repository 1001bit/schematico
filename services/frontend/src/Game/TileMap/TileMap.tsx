import { Rect } from "react-konva";
import { Tile } from "./tile";

export type TileMapType = [{ x: number; y: number }, Tile][];

interface TileMapProps {
  width: number;
  height: number;
  camX: number;
  camY: number;
  tileSize: number;
  map: TileMapType;
}

export default function TileMap(props: TileMapProps) {
  const { width, height, camX, camY, tileSize, map } = props;

  const xStart = camX / tileSize - 1;
  const yStart = camY / tileSize - 1;
  const xEnd = xStart + width / tileSize + 1;
  const yEnd = yStart + height / tileSize + 1;

  const tiles = [];

  for (const [pos, tile] of map) {
    if (pos.x < xStart || pos.x > xEnd || pos.y < yStart || pos.y > yEnd) {
      continue;
    }
    const a = Math.floor((tile.state ? 1 : 0.5) * 255).toString(16);
    tiles.push(
      <Rect
        key={`${pos.x}-${pos.y}`}
        x={pos.x * tileSize}
        y={pos.y * tileSize}
        width={tileSize}
        height={tileSize}
        fill={tile.type + a}
      />
    );
  }

  return <>{tiles}</>;
}
