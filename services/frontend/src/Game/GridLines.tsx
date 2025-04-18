import { memo } from "react";
import { Line } from "react-konva";

interface GridLinesProps {
  tile: number;
  width: number;
  height: number;

  camX: number;
  camY: number;
}

const GridLines = (props: GridLinesProps) => {
  const { tile, width, height, camX, camY } = props;

  const x = camX - (camX % tile);
  const y = camY - (camY % tile);
  const color = "#707070";

  const verticalLines = [];
  for (let col = x - tile; col <= width + x + tile; col += tile) {
    verticalLines.push(
      <Line
        key={`v-${col}`}
        points={[col, camY, col, height + camY]}
        stroke={color}
        strokeWidth={0.5}
      />
    );
  }

  const horizontalLines = [];
  for (let row = y - tile; row <= height + y + tile; row += tile) {
    horizontalLines.push(
      <Line
        key={`h-${row}`}
        points={[camX, row, width + camX, row]}
        stroke={color}
        strokeWidth={0.5}
      />
    );
  }

  return (
    <>
      {verticalLines}
      {horizontalLines}
    </>
  );
};

export default memo(GridLines);
