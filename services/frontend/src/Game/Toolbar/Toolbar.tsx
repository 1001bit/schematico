import { memo } from "react";
import { TileColors, TileLabels } from "../Drawer/tile";
import { WireColor } from "../Drawer/wire";
import Tool from "./Tool";
import { TileType } from "../tilemap";

interface ToolbarProps {
  onSelect: (t: ToolType) => void;
  currTool: ToolType;
  className?: string;
}

export enum ToolType {
  Drag = "drag",
  Erase = "erase",

  Wire = "wire",
  Or = "or",
  And = "and",
  Not = "not",
  Input = "input",
  Bulb = "bulb",
}

export const ToolColors = {
  [ToolType.Drag]: "#ffffff",
  [ToolType.Erase]: "#ffffff",

  [ToolType.Wire]: WireColor,

  [ToolType.Or]: TileColors[TileType.Or],
  [ToolType.And]: TileColors[TileType.And],
  [ToolType.Not]: TileColors[TileType.Not],
  [ToolType.Input]: TileColors[TileType.Input],
  [ToolType.Bulb]: TileColors[TileType.Bulb],
};

export const ToolLabels = {
  [ToolType.Drag]: "Drag",
  [ToolType.Erase]: "Erase",

  [ToolType.Wire]: "Wire",

  [ToolType.Or]: TileLabels[TileType.Or],
  [ToolType.And]: TileLabels[TileType.And],
  [ToolType.Not]: TileLabels[TileType.Not],
  [ToolType.Input]: TileLabels[TileType.Input],
  [ToolType.Bulb]: TileLabels[TileType.Bulb],
};

export const ToolToTileType = {
  [ToolType.Or]: TileType.Or,
  [ToolType.And]: TileType.And,
  [ToolType.Not]: TileType.Not,
  [ToolType.Bulb]: TileType.Bulb,
  [ToolType.Input]: TileType.Input,
};

function Toolbar(props: ToolbarProps) {
  const bgTransparency = "20";

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
          color: ToolColors[ToolType.Wire],
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
            className={`border-2 backdrop-blur-[2px] ${type != ToolType.Bulb && type != ToolType.Input && "rounded-4xl"}`}
            style={{
              borderColor: ToolColors[type],
              backgroundColor: ToolColors[type] + bgTransparency,
              color: ToolColors[type],
            }}
            key={idx}
          ></Tool>
        );
      })}
    </div>
  );
}

export default memo(Toolbar);
