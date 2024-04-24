import { useCallback, useEffect, useRef, useState } from "react";

const isKeyDownCodeAllowed = (key: string) => {
  console.log(key);

  return (
    key.startsWith("Key") ||
    key.startsWith("Digit") ||
    key === "Backspace" ||
    key === "Space" ||
    key === "Slash" ||
    key === "NumpadSubtract"
  );
};

const useTypings = (enabled: boolean) => {
  const [cursor, setCursor] = useState(0);
  const [typed, setTyped] = useState<string>("");
  const totalTyped = useRef(0);

  const keyDownHandler = useCallback(
    ({ key, code }: KeyboardEvent) => {
      if (!enabled || !isKeyDownCodeAllowed(code)) {
        return;
      }

      switch (key) {
        case "Backspace":
          setTyped((typed) => typed.slice(0, -1));
          setCursor(cursor - 1);
          totalTyped.current -= 1;
          break;

        default:
          setTyped((typed) => typed.concat(key));
          setCursor(cursor + 1);
          totalTyped.current += 1;
          break;
      }
    },
    [cursor, enabled]
  );

  const clear = useCallback(() => {
    setTyped("");
    setCursor(0);
  }, []);

  const reset = useCallback(() => {
    totalTyped.current = 0;
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);

  return {
    typed,
    cursor,
    totalTyped: totalTyped.current,
    clear,
    reset,
  };
};

export default useTypings;
