import { TileType } from "../../project/interfaces";
import { TileColors } from "../TileMap/Tile";

interface ToolProps {
  onSelect: (type: ToolType) => void;
  text: string;

  type: ToolType;
  choseTool: ToolType;
}

export enum ToolType {
  Or = TileType.Or,
  And = TileType.And,
  Not = TileType.Not,
  Drag = 4,
  Wire = 5,
}

export const ToolColors: Record<ToolType, string> = {
  [ToolType.Or]: TileColors[ToolType.Or],
  [ToolType.And]: TileColors[ToolType.And],
  [ToolType.Not]: TileColors[ToolType.Not],
  [ToolType.Drag]: "#ffffff",
  [ToolType.Wire]: "#00ff00",
};

export default function Tool(props: ToolProps) {
  console.log(ToolColors[props.type]);

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
