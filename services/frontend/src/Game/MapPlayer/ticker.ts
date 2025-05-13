import { useEffect, useRef } from "react";

function useTicker(callback: () => void, initDelay: number) {
  const interval = useRef<NodeJS.Timeout>(null);
  const delay = useRef(initDelay);

  useEffect(() => {
    delay.current = initDelay;
  }, [initDelay]);

  const start = () => {
    stop();
    interval.current = setInterval(() => callback(), delay.current);
  };

  const stop = () => {
    if (!interval.current) return;
    clearInterval(interval.current);
    interval.current = null;
  };

  useEffect(() => {
    delay.current = initDelay;
    stop();
    start();
  }, [initDelay]);

  useEffect(() => {
    return stop;
  }, []);

  return {
    start,
    stop,
  };
}

export default useTicker;
