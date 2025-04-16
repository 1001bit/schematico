import { memo } from "react";
import Tool, { ToolType } from "./Tool";

interface ToolbarProps {
  onSelect: (t: ToolType) => void;
  currTool: ToolType;
  className?: string;
}

function Toolbar(props: ToolbarProps) {
  return (
    <div
      className={`
      flex flex-row gap-6
      ${props.className}
    `}
    >
      <Tool
        text="drag"
        type={ToolType.Drag}
        onSelect={props.onSelect}
        choseTool={props.currTool}
      ></Tool>
      <Tool
        text="erase"
        type={ToolType.Erase}
        onSelect={props.onSelect}
        choseTool={props.currTool}
      ></Tool>
      <Tool
        text="Wire"
        type={ToolType.Wire}
        onSelect={props.onSelect}
        choseTool={props.currTool}
      ></Tool>
      <Tool
        text="<OR>"
        type={ToolType.Or}
        onSelect={props.onSelect}
        choseTool={props.currTool}
      ></Tool>
      <Tool
        text="<AND>"
        type={ToolType.And}
        onSelect={props.onSelect}
        choseTool={props.currTool}
      ></Tool>
      <Tool
        text="<NOT>"
        type={ToolType.Not}
        onSelect={props.onSelect}
        choseTool={props.currTool}
      ></Tool>
    </div>
  );
}

export default memo(Toolbar);
