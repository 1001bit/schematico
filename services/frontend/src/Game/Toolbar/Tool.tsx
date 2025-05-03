import { memo } from "react";
import { TileColors } from "../Draw/tile";
import { WireColor } from "../Draw/wire";

interface ToolProps {
  onSelect: (type: ToolType) => void;
  text: string;

  type: ToolType;
  choseTool: ToolType;
}

export enum ToolType {
  Or = 1,
  And = 2,
  Not = 3,
  Drag = 4,
  Wire = 5,
  Erase = 6,
}

export const ToolColors: Record<ToolType, string> = {
  [ToolType.Or]: TileColors[ToolType.Or],
  [ToolType.And]: TileColors[ToolType.And],
  [ToolType.Not]: TileColors[ToolType.Not],
  [ToolType.Drag]: "#ffffff",
  [ToolType.Wire]: WireColor,
  [ToolType.Erase]: "#ffffff",
};

function Tool(props: ToolProps) {
  return (
    <div
      onClick={() => props.onSelect(props.type)}
      style={{
        borderColor: ToolColors[props.type],
      }}
      className={`
      border-1
      h-14 w-14
      bg-acc-bg
      backdrop-blur-[5px]
      cursor-pointer
      transition-all duration-75 ease-in-out
      flex
      justify-center
      items-center
      select-none
      ${props.type == props.choseTool ? "scale-110" : "hover:scale-105"}
      `}
    >
      {props.text}
    </div>
  );
}

export default memo(Tool);
