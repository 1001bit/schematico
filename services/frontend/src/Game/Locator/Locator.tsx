interface LocatorProps {
  x: number;
  y: number;
  className?: string;
}

export default function Locator(props: LocatorProps) {
  return (
    <div className={`flex gap-1 ${props.className}`}>
      x: {Math.floor(props.x)}, y: {Math.floor(props.y)}
    </div>
  );
}
