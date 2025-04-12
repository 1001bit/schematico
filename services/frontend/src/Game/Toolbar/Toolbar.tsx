import Tool, { ToolTypeColors } from "./Tool";

interface ToolbarProps {
  onSelect: (t: ToolTypeColors) => void;
  currTool: ToolTypeColors;
  className?: string;
}

export default function Toolbar(props: ToolbarProps) {
  return (
    <div
      className={`
      flex flex-row gap-6
      ${props.className}
    `}
    >
      <Tool
        text="drag"
        type={ToolTypeColors.Drag}
        onSelect={props.onSelect}
        choseTool={props.currTool}
      ></Tool>
      <Tool
        text="Wire"
        type={ToolTypeColors.Wire}
        onSelect={props.onSelect}
        choseTool={props.currTool}
      ></Tool>
      <Tool
        text="<OR>"
        type={ToolTypeColors.Or}
        onSelect={props.onSelect}
        choseTool={props.currTool}
      ></Tool>
      <Tool
        text="<AND>"
        type={ToolTypeColors.And}
        onSelect={props.onSelect}
        choseTool={props.currTool}
      ></Tool>
      <Tool
        text="<NOT>"
        type={ToolTypeColors.Not}
        onSelect={props.onSelect}
        choseTool={props.currTool}
      ></Tool>
    </div>
  );
}
