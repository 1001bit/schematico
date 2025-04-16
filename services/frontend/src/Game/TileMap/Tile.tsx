import { Rect } from "react-konva";
import { TileInterface, TileType } from "../../project/interfaces";
import { vector2 } from "../vector2";
import { memo } from "react";

interface TileProps {
  pos: vector2;
  tileSize: number;
  tile: TileInterface;
}

export const TileColors: Record<TileType, string> = {
  [TileType.Or]: "#ff0000",
  [TileType.And]: "#00ffff",
  [TileType.Not]: "#ffff00",
};

function Tile(props: TileProps) {
  return (
    <Rect
      x={props.pos.x * props.tileSize}
      y={props.pos.y * props.tileSize}
      width={props.tileSize}
      height={props.tileSize}
      fill={TileColors[props.tile.type]}
    />
  );
}

export default memo(Tile);
