import { useCallback, useRef } from "react";

function useDebouncedCallback(
  callback: (...args: any[]) => void,
  delay: number
) {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: any[]) => {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

export default useDebouncedCallback;
