import { useRef } from "react";
import { useEffect } from "react";

export default function GridItem({ ele, isHighlight }) {
  let divRef = useRef();

  useEffect(() => {
    if (ele.text) {
      divRef.current.classList.add("grid-item-zoom");
    } else {
      divRef.current.classList.remove("grid-item-zoom");
    }

    if (ele.isSuccess) {
      divRef.current.classList.add("success");
    } else if (ele.isWrong) {
      divRef.current.classList.add("wrong");
      divRef.current.classList.remove("success");
    } else {
      divRef.current.classList.remove("wrong");
      divRef.current.classList.remove("success");
    }

    if (isHighlight) {
      divRef.current.classList.add("highlight-item");
    } else {
      divRef.current.classList.remove("highlight-item");
    }
  }, [ele, isHighlight]);

  return (
    <div ref={divRef} className={"grid-item"}>
      {ele?.text?.toUpperCase()}
    </div>
  );
}
