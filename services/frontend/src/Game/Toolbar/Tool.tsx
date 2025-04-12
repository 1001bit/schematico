import { TileTypeColors } from "../TileMap/tile";

interface ToolProps {
  onSelect: (type: ToolTypeColors) => void;
  text: string;

  type: ToolTypeColors;
  choseTool: ToolTypeColors;
}

export enum ToolTypeColors {
  Drag = "#ffffff",
  Wire = "#00ff00",
  Or = TileTypeColors.Or,
  And = TileTypeColors.And,
  Not = TileTypeColors.Not,
}

export default function Tool(props: ToolProps) {
  return (
    <div
      onClick={() => props.onSelect(props.type)}
      style={{
        borderColor: props.type,
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
