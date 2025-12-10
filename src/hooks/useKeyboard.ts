import { useEffect } from "react";

// --- Responsável por capturar as teclas precionadas ---
export default function useKeyboard(handleClick: (value: string) => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleClick("=");
      else if (e.key === "Backspace") handleClick("⌫");
      else if (e.key === "Delete") handleClick("C");
      else if ("0123456789.+-/*xX".includes(e.key)) {
        let key = e.key;
        if (key === "*") key = "x";
        if (key === "/") key = "÷";
        handleClick(key);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClick]);
}
