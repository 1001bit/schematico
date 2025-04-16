import { Arrow } from "react-konva";
import { vector2 } from "../vector2";
interface WireProps {
  start: vector2;
  end: vector2;
  tileSize: number;
}

export const WireColor = "#00ff00";

export function Wire(props: WireProps) {
  const { start, end, tileSize } = props;
  return (
    <Arrow
      points={[
        (start.x + 0.5) * tileSize,
        (start.y + 0.5) * tileSize,
        (end.x + 0.5) * tileSize,
        (end.y + 0.5) * tileSize,
      ]}
      fill={WireColor}
      stroke={WireColor}
      tension={3}
    />
  );
}
