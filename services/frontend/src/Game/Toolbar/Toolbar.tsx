import Tool from "./Tool";

export enum ToolType {
  Wire = "wire",
  Or = "or",
  And = "and",
  Not = "not",
  Drag = "drag",
}

interface ToolbarProps {
  onSelect: (t: ToolType) => void;
  currTool: ToolType;
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
        className="border-white border-dashed"
        text="drag"
        type={ToolType.Drag}
        onSelect={props.onSelect}
        choseTool={props.currTool}
      ></Tool>
      <Tool
        className="border-lime-600"
        text="Wire"
        type={ToolType.Wire}
        onSelect={props.onSelect}
        choseTool={props.currTool}
      ></Tool>
      <Tool
        className="border-red-600"
        text="<OR>"
        type={ToolType.Or}
        onSelect={props.onSelect}
        choseTool={props.currTool}
      ></Tool>
      <Tool
        className="border-cyan-500"
        text="<AND>"
        type={ToolType.And}
        onSelect={props.onSelect}
        choseTool={props.currTool}
      ></Tool>
      <Tool
        className="border-pink-500"
        text="<NOT>"
        type={ToolType.Not}
        onSelect={props.onSelect}
        choseTool={props.currTool}
      ></Tool>
    </div>
  );
}
