import "./App.css";
import useCalculator from "./hooks/useCalculator";
import useKeyboard from "./hooks/useKeyboard";
import useTheme from "./hooks/useTheme";

interface AppProps {
  bodyElement: HTMLElement;
}

export default function App({ bodyElement }: AppProps) {

  const { darkMode, setDarkMode } = useTheme(bodyElement);

  const { input, result, history, handleClick } = useCalculator();
  useKeyboard(handleClick);

  const buttons = [
    "%", "CE", "C", "⌫",
    "1/x", "x²", "√", "÷",
    "7", "8", "9", "x",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "+/-", "0", ".", "="
  ];

  return (
    <>
      <div className="calc-container">
        <div className="top-bar">
        </div>

        <div className="display">
          <div className="expression">{input || "0"}</div>
          <div className="result">{result}</div>
        </div>

        <div className="buttons-grid">
          {buttons.map((btn) => (
            <button
              key={btn}
              className={
                btn === "C" || btn === "CE"
                  ? "clear"
                  : btn === "="
                    ? "equal"
                    : ["÷", "x", "-", "+", "%"].includes(btn)
                      ? "operator"
                      : ""
              }
              onClick={() => handleClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      <aside className="sidebar">
        <h3>Histórico
          <button
            title="Trocar tema"
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Trocar tema"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </h3>
        <div className="history">
          {history.slice().reverse().map((h, idx) => (
            <div key={idx} className="history-item">{h}</div>
          ))}
        </div>
      </aside>
    </>
  );
}
