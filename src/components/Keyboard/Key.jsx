import { useRef, useEffect } from "react";

export default function Key({ value, onClick, isUsed }) {
  let buttonRef = useRef();

  useEffect(() => {
    if (isUsed === 2) {
      buttonRef.current.classList.add("success-btn");
    } else if (isUsed === 1) {
      buttonRef.current.classList.add("used-btn");
    } else {
      buttonRef.current.classList.remove("success-btn");
      buttonRef.current.classList.remove("used-btn");
    }
  });

  return (
    <button
      ref={buttonRef}
      className="keyboard-btn"
      onClick={(e) => onClick(value, e)}
    >
      {value}
    </button>
  );
}
