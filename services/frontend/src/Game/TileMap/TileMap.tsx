import { TileMapType } from "../../project/interfaces";
import { Tile } from "./Tile";

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

  for (const [posStr, tile] of Object.entries(map)) {
    const pos = {
      x: Number(posStr.split(",")[0]),
      y: Number(posStr.split(",")[1]),
    };

    if (pos.x < xStart || pos.x > xEnd || pos.y < yStart || pos.y > yEnd) {
      continue;
    }
    tiles.push(
      <Tile
        x={pos.x}
        y={pos.y}
        tileSize={tileSize}
        tile={tile}
        key={`${pos.x}-${pos.y}`}
      ></Tile>
    );
  }

  return <>{tiles}</>;
}
