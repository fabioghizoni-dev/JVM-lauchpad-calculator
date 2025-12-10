import { useCallback, useState } from "react";
import { calculate } from "../functions/calculate";

// --- Responsável por toda a lógica da calculadora ---
export default function useCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("0");
  const [history, setHistory] = useState<string[]>([]);

  const handleClick = useCallback((value: string) => {
    let val = value;

    if (val === "÷") val = "/";
    if (val === "x") val = "*";

    switch (value) {
      case "C":
        setInput("");
        setResult("0");
        return;

      case "CE":
        setInput("");
        return;

      case "⌫":
        setInput((prev) => prev.slice(0, -1));
        return;

      case "=": {
        const res = calculate(input);
        setResult(res);
        setHistory((prev) => [...prev.slice(-9), `${input} = ${res}`]);
        setInput(res);
        return;
      }

      case "+/-":
        setInput((prev) => {
          if (!prev) return prev;
          if (prev.startsWith("-")) return prev.slice(1);
          return "-" + prev;
        });
        return;

      case "%":
        setInput((prev) => String(Number(prev) / 100));
        return;

      case "√":
        setInput((prev) => String(Math.sqrt(Number(prev))));
        return;

      case "x²":
        setInput((prev) => String(Number(prev) ** 2));
        return;

      case "1/x":
        setInput((prev) => String(1 / Number(prev)));
        return;

      default:
        setInput((prev) => prev + val);
        return;
    }
  }, [input]);

  return {
    input,
    result,
    history,
    handleClick,
  };
}

