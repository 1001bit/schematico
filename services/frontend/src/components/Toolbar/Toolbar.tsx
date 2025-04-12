import { Dispatch, SetStateAction } from "react";
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
  setCurrTool: Dispatch<SetStateAction<ToolType>>;
}

export default function Toolbar(props: ToolbarProps) {
  function onSelect(t: ToolType) {
    props.setCurrTool(t);
  }

  return (
    <div className="flex flex-row gap-6 absolute left-1/2 -translate-x-1/2">
      <Tool
        className="border-white border-dashed"
        text="drag"
        type={ToolType.Drag}
        onSelect={onSelect}
        choseTool={props.currTool}
      ></Tool>
      <Tool
        className="border-lime-600"
        text="Wire"
        type={ToolType.Wire}
        onSelect={onSelect}
        choseTool={props.currTool}
      ></Tool>
      <Tool
        className="border-red-600"
        text="<OR>"
        type={ToolType.Or}
        onSelect={onSelect}
        choseTool={props.currTool}
      ></Tool>
      <Tool
        className="border-cyan-500"
        text="<AND>"
        type={ToolType.And}
        onSelect={onSelect}
        choseTool={props.currTool}
      ></Tool>
      <Tool
        className="border-pink-500"
        text="<NOT>"
        type={ToolType.Not}
        onSelect={onSelect}
        choseTool={props.currTool}
      ></Tool>
    </div>
  );
}
