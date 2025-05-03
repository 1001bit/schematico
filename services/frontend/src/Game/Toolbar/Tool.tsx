import { CSSProperties, memo } from "react";

interface ToolProps {
  onSelect: (type: ToolType) => void;
  text: string;
  toolType: ToolType;
  currToolType: ToolType;

  style?: CSSProperties;
  className?: string;
}

export enum ToolType {
  Or = 1,
  And = 2,
  Not = 3,
  Drag = 4,
  Wire = 5,
  Erase = 6,
}

function Tool({
  onSelect,
  text,
  toolType,
  currToolType,
  style,
  className,
}: ToolProps) {
  return (
    <div
      onClick={() => onSelect(toolType)}
      style={style}
      className={`
        h-14 w-14
        cursor-pointer
        transition-all duration-75 ease-in-out
        flex
        justify-center
        items-center
        select-none
        ${toolType == currToolType ? "scale-110" : "hover:scale-105"}
        ${className}
      `}
    >
      {text}
    </div>
  );
}

export default memo(Tool);
