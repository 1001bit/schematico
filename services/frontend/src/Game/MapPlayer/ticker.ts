import { useEffect, useRef } from "react";

function useTicker(callback: () => void, dtMs: number) {
  const interval = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    return stop;
  }, []);

  const start = () => {
    interval.current = setInterval(callback, dtMs);
  };

  const stop = () => {
    if (interval.current) clearInterval(interval.current);
  };

  return {
    start,
    stop,
  };
}

export default useTicker;
