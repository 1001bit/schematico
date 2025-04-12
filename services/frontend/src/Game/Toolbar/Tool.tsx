import { ToolType } from "./Toolbar";

interface ToolProps {
  onSelect: (type: ToolType) => void;
  className: string;
  text: string;

  type: ToolType;
  choseTool: ToolType;
}

export default function Tool(props: ToolProps) {
  return (
    <div
      onClick={() => props.onSelect(props.type)}
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
      ${props.className}
      `}
    >
      {props.text}
    </div>
  );
}
