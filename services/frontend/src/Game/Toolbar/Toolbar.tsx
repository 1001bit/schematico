import { memo } from "react";
import { TileColors } from "../Drawer/tile";
import { WireColor } from "../Drawer/wire";
import Tool from "./Tool";
import { TileType, ToolType } from "../interfaces";

interface ToolbarProps {
  onSelect: (t: ToolType) => void;
  currTool: ToolType;
  className?: string;
}

export const ToolColors: Record<ToolType, string> = {
  [ToolType.Drag]: "#ffffff",
  [ToolType.Erase]: "#ffffff",

  [ToolType.Wire]: WireColor,
  [ToolType.Or]: TileColors[TileType.Or],
  [ToolType.And]: TileColors[TileType.And],
  [ToolType.Not]: TileColors[TileType.Not],
  [ToolType.Input]: TileColors[TileType.Input],
  [ToolType.Bulb]: TileColors[TileType.Bulb],
};

export const ToolLabels: Record<ToolType, string> = {
  [ToolType.Drag]: "Drag",
  [ToolType.Erase]: "Erase",

  [ToolType.Wire]: "Wire",
  [ToolType.Or]: "OR",
  [ToolType.And]: "AND",
  [ToolType.Not]: "NOT",
  [ToolType.Input]: "Input",
  [ToolType.Bulb]: "Bulb",
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
      {[ToolType.Drag, ToolType.Erase].map((type, idx) => {
        return (
          <Tool
            text={ToolLabels[type]}
            toolType={type}
            onSelect={props.onSelect}
            currToolType={props.currTool}
            className="border-1 border-dashed backdrop-blur-[2px]"
            style={{
              borderColor: ToolColors[type],
            }}
            key={idx}
          ></Tool>
        );
      })}

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

      {[
        ToolType.Or,
        ToolType.And,
        ToolType.Not,
        ToolType.Input,
        ToolType.Bulb,
      ].map((type, idx) => {
        return (
          <Tool
            text={ToolLabels[type]}
            toolType={type}
            onSelect={props.onSelect}
            currToolType={props.currTool}
            className="border-2 backdrop-blur-[2px]"
            style={{
              borderColor: ToolColors[type],
              backgroundColor: ToolColors[type] + bgTransparency,
            }}
            key={idx}
          ></Tool>
        );
      })}
    </div>
  );
}

export default memo(Toolbar);
