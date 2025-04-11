interface ToolProps {
  onSelect: () => void;
}

export default function Tool(props: ToolProps) {
  return (
    <div
      onClick={props.onSelect}
      className="
        border-1
        h-12 w-12
      bg-gray-900 
        hover:scale-105
        cursor-pointer
      "
    ></div>
  );
}
