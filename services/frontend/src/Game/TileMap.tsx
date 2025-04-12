import { Rect } from "react-konva";

export enum TileType {
  Or,
  And,
  Not,
}

interface TileMapProps {
  width: number;
  height: number;
  camX: number;
  camY: number;
  tile: number;
  map: Map<{ x: number; y: number }, TileType>;
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
    let color = "white";
    switch (val) {
      case TileType.Or:
        color = "red";
        break;
      case TileType.And:
        color = "cyan";
        break;
      case TileType.Not:
        color = "pink";
        break;
    }
    tiles.push(
      <Rect
        x={key.x * tile}
        y={key.y * tile}
        width={tile}
        height={tile}
        fill={color}
      />
    );
  }

  return <>{tiles}</>;
}
