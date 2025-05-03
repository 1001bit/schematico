import { memo } from "react";
import Tool, { ToolType } from "./Tool";
import { TileColors } from "../Draw/tile";
import { WireColor } from "../Draw/wire";

interface ToolbarProps {
  onSelect: (t: ToolType) => void;
  currTool: ToolType;
  className?: string;
}

export const ToolColors: Record<ToolType, string> = {
  [ToolType.Or]: TileColors[ToolType.Or],
  [ToolType.And]: TileColors[ToolType.And],
  [ToolType.Not]: TileColors[ToolType.Not],
  [ToolType.Drag]: "#ffffff",
  [ToolType.Wire]: WireColor,
  [ToolType.Erase]: "#ffffff",
};

const bgTransparency = "20";

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
        toolType={ToolType.Drag}
        onSelect={props.onSelect}
        currToolType={props.currTool}
        className="border-1 border-dashed backdrop-blur-[2px]"
        style={{
          borderColor: ToolColors[ToolType.Drag],
        }}
      ></Tool>
      <Tool
        text="erase"
        toolType={ToolType.Erase}
        onSelect={props.onSelect}
        currToolType={props.currTool}
        className="border-1 border-dashed backdrop-blur-[2px]"
        style={{
          borderColor: ToolColors[ToolType.Erase],
        }}
      ></Tool>
      <Tool
        text="Wire"
        toolType={ToolType.Wire}
        onSelect={props.onSelect}
        currToolType={props.currTool}
        className="border-2 backdrop-blur-[2px]"
        style={{
          borderColor: ToolColors[ToolType.Wire],
        }}
      ></Tool>
      <Tool
        text="<OR>"
        toolType={ToolType.Or}
        onSelect={props.onSelect}
        currToolType={props.currTool}
        className="border-2 backdrop-blur-[2px]"
        style={{
          borderColor: ToolColors[ToolType.Or],
          backgroundColor: ToolColors[ToolType.Or] + bgTransparency,
        }}
      ></Tool>
      <Tool
        text="<AND>"
        toolType={ToolType.And}
        onSelect={props.onSelect}
        currToolType={props.currTool}
        className="border-2 backdrop-blur-[2px]"
        style={{
          borderColor: ToolColors[ToolType.And],
          backgroundColor: ToolColors[ToolType.And] + bgTransparency,
        }}
      ></Tool>
      <Tool
        text="<NOT>"
        toolType={ToolType.Not}
        onSelect={props.onSelect}
        currToolType={props.currTool}
        className="border-2 backdrop-blur-[2px]"
        style={{
          borderColor: ToolColors[ToolType.Not],
          backgroundColor: ToolColors[ToolType.Not] + bgTransparency,
        }}
      ></Tool>
    </div>
  );
}

export default memo(Toolbar);
