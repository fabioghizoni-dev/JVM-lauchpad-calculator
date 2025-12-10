import { evaluate } from "mathjs";

// --- Função de cálculo ---
export const calculate = (expression: string) => {
  try {
    const exp = expression.replace(/x/gi, "*").replace(/÷/g, "/");
    const res = evaluate(exp);
    if (!isFinite(res)) return "Erro";
    return String(res);
  } catch {
    return "Erro";
  }
};