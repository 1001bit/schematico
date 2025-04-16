import { memo } from "react";

interface LocatorProps {
  x: number;
  y: number;
  className?: string;
}

function Locator(props: LocatorProps) {
  return (
    <div className={`flex gap-1 ${props.className}`}>
      x: {Math.floor(props.x)}, y: {Math.floor(props.y)}
    </div>
  );
}

export default memo(Locator);
