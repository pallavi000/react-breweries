import React, { useEffect, useState } from "react";

function useDebounce(value: string) {
  const [debounceValue, setDebounceValue] = useState<string>("");
  let timer: ReturnType<typeof setTimeout>;

  useEffect(() => {
    timer = setTimeout(() => {
      setDebounceValue(value);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debounceValue;
}

export default useDebounce;
