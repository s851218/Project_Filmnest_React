import { useRef } from "react";

const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);

  return (...args) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
export default useDebounce;
