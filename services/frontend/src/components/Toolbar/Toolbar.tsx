import Tool from "../Tool/Tool";

export enum ToolType {
  Wire = "wire",
  Or = "or",
  And = "and",
  Not = "not",
  Drag = "drag",
}

interface ToolbarProps {
  onSelect: (t: ToolType) => void;
}

export default function Toolbar(props: ToolbarProps) {
  return (
    <div className="flex flex-row gap-6">
      <Tool onSelect={() => props.onSelect(ToolType.Drag)}></Tool>
      <Tool onSelect={() => props.onSelect(ToolType.Wire)}></Tool>
      <Tool onSelect={() => props.onSelect(ToolType.Or)}></Tool>
      <Tool onSelect={() => props.onSelect(ToolType.And)}></Tool>
      <Tool onSelect={() => props.onSelect(ToolType.Not)}></Tool>
    </div>
  );
}
