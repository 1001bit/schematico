import { Line } from "react-konva";

interface GridLinesProps {
  tile: number;
  width: number;
  height: number;

  camX: number;
  camY: number;
}

export default function GridLines(props: GridLinesProps) {
  const { tile, width, height, camX, camY } = props;

  const x = camX - (camX % tile);
  const y = camY - (camY % tile);
  const color = "#505050";

  const verticalLines = [];
  for (let col = x; col <= width + x; col += tile) {
    verticalLines.push(
      <Line
        key={`v-${col}`}
        points={[col, camY, col, height + camY]}
        stroke={color}
        strokeWidth={1}
      />
    );
  }

  const horizontalLines = [];
  for (let row = y; row <= height + y; row += tile) {
    horizontalLines.push(
      <Line
        key={`h-${row}`}
        points={[camX, row, width + camX, row]}
        stroke={color}
        strokeWidth={1}
      />
    );
  }

  return (
    <>
      {verticalLines}
      {horizontalLines}
    </>
  );
}
