import { memo } from "react";
import { RoundTiles, TileColors, TileLabels } from "../Drawer/tile";
import { WireColor } from "../Drawer/wire";
import Item from "./Item";
import { TileType } from "../tilemap";

export type ToolbarItem =
  | { item: "tool"; type: ToolType }
  | { item: "tile"; type: TileType };

export enum ToolType {
  Drag = "drag",
  Erase = "erase",
  Wire = "wire",
}

export const ToolColors = {
  [ToolType.Drag]: "#ffffff",
  [ToolType.Erase]: "#ffffff",
  [ToolType.Wire]: WireColor,
};

export const ToolLabels = {
  [ToolType.Drag]: "Drag",
  [ToolType.Erase]: "Erase",
  [ToolType.Wire]: "Wire",
};

interface ToolbarProps {
  onSelect: (i: ToolbarItem) => void;
  currItem: ToolbarItem;
  className?: string;
}

function Toolbar(props: ToolbarProps) {
  const bgTransparency = "20";

  return (
    <div
      className={`
      flex flex-row gap-6
      flex-wrap
      justify-center
      ${props.className}
    `}
    >
      {[ToolType.Drag, ToolType.Erase, ToolType.Wire].map((type, idx) => {
        return (
          <Item
            text={ToolLabels[type]}
            item={{ item: "tool", type: type }}
            onSelect={props.onSelect}
            currItem={props.currItem}
            className="border-1 backdrop-blur-[2px]"
            style={{
              borderColor: ToolColors[type],
            }}
            key={idx}
          ></Item>
        );
      })}

      {[
        TileType.Or,
        TileType.And,
        TileType.Not,
        TileType.Input,
        TileType.Bulb,
      ].map((type, idx) => {
        return (
          <Item
            text={TileLabels[type]}
            item={{ item: "tile", type: type }}
            onSelect={props.onSelect}
            currItem={props.currItem}
            className={`border-2 backdrop-blur-[2px] ${RoundTiles.has(type) && "rounded-4xl"}`}
            style={{
              borderColor: TileColors[type],
              backgroundColor: TileColors[type] + bgTransparency,
              color: TileColors[type],
            }}
            key={idx}
          ></Item>
        );
      })}
    </div>
  );
}

export default memo(Toolbar);
