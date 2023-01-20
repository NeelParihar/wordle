import "./Header.css";

export default function header({ setShowHelpModal }) {
  return (
    <div className={"header"}>
      WORDLE
      <button
        className="close"
        onClick={() => setShowHelpModal((prev) => !prev)}
      >
        i
      </button>
    </div>
  );
}
