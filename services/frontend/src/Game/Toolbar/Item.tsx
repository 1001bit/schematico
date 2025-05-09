import { CSSProperties, memo } from "react";
import { ToolbarItem } from "./Toolbar";

interface ItemProps {
  onSelect: (type: ToolbarItem) => void;
  text: string;
  item: ToolbarItem;
  currItem: ToolbarItem;

  style?: CSSProperties;
  className?: string;
}

function Item({ onSelect, text, item, currItem, style, className }: ItemProps) {
  return (
    <div
      onClick={() => onSelect(item)}
      style={style}
      className={`
        h-14 w-14
        cursor-pointer
        transition-all duration-75 ease-in-out
        flex
        justify-center
        items-center
        select-none
        ${item.type == currItem.type ? "scale-110" : "hover:scale-105"}
        ${className}
      `}
    >
      {text}
    </div>
  );
}

export default memo(Item);
