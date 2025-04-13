import { Rect } from "react-konva";
import { TileInterface, TileType } from "../../project/interfaces";

interface TileProps {
  x: number;
  y: number;
  tileSize: number;
  tile: TileInterface;
}

export const TileColors: Record<TileType, string> = {
  [TileType.Or]: "#ff0000",
  [TileType.And]: "#00ffff",
  [TileType.Not]: "#ffff00",
};

export function Tile(props: TileProps) {
  return (
    <Rect
      x={props.x * props.tileSize}
      y={props.y * props.tileSize}
      width={props.tileSize}
      height={props.tileSize}
      fill={TileColors[props.tile.type]}
    />
  );
}
