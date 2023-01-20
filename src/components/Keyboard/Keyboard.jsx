import "./Keyboard.css";
import Key from "./Key";

export default function Keyboard({
  insertChar,
  deleteChar,
  submitGuess,
  usedChars,
}) {
  return (
    <section className="keyboard">
      <div className="keyboard-sec">
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
          <Key
            value={key}
            key={key}
            isUsed={usedChars[key]}
            onClick={insertChar}
          />
        ))}
      </div>
      <div className="keyboard-sec">
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={insertChar}
            isUsed={usedChars[key]}
          />
        ))}
      </div>
      <div className="keyboard-sec">
        <Key width={70} value="ENTER" onClick={submitGuess}>
          Enter
        </Key>
        {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={insertChar}
            isUsed={usedChars[key]}
          />
        ))}
        <Key width={70} value="DELETE" onClick={deleteChar}>
          Delete
        </Key>
      </div>
    </section>
  );
}
