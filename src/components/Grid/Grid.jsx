/* eslint-disable array-callback-return */
import GridItem from "./GridItem";
import "./Grid.css";

const getGridItems = (guesses, selectedRowIndx, selectedColIndx) => {
  const items = [];

  guesses.map((guess, rowIndx) => {
    guess.map((ele, colIndx) => {
      if (selectedRowIndx === rowIndx && selectedColIndx === colIndx) {
        console.log({ selectedRowIndx, rowIndx }, { selectedColIndx, colIndx });
        items.push(
          <GridItem key={`${rowIndx}${colIndx}`} ele={ele} isHighlight={true} />
        );
      } else {
        items.push(
          <GridItem
            key={`${rowIndx}${colIndx}`}
            ele={ele}
            isHighlight={false}
          />
        );
      }
    });
  });

  return items;
};

export default function Grid({ guesses, selectedRowIndx, selectedColIndx }) {
  return (
    <section className="grid">
      {getGridItems(guesses, selectedRowIndx, selectedColIndx)}
    </section>
  );
}
