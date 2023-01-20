import "./App.css";
import Grid from "./components/Grid/Grid";
import Keyboard from "./components/Keyboard/Keyboard";
import Header from "./components/Header/Header";
import { useState } from "react";
import { WORDS } from "./constants/words";
import { ToastContainer, toast } from "react-toastify";
import InfoModal from "./components/InfoModal/InfoModal";
import "react-toastify/dist/ReactToastify.css";

let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log(rightGuessString);

function App() {
  /**
   * State variables
   */
  const [usedChars, setUsedChars] = useState({});
  const [showHelpModal, setShowHelpModal] = useState(false);

  const [guesses, setGuesses] = useState(
    new Array(6)
      .fill({ text: "", isSuccess: false })
      .map(() => new Array(5).fill({ text: "", isSuccess: false }))
  );

  const [currentGuess, setCurrentGuess] = useState(1);
  const [nextLetter, setNextLetter] = useState(0);

  /**
   * Helper functions
   */
  const insertChar = (ch) => {
    if (nextLetter === 5) return;

    setGuesses((guesses) => {
      guesses[currentGuess - 1][nextLetter] = { text: ch, isSuccess: false };
      return guesses;
    });

    setNextLetter((nex) => nex + 1);
  };

  const deleteChar = () => {
    if (nextLetter === 0) return;

    setGuesses((guesses) => {
      guesses[currentGuess - 1][nextLetter - 1] = {
        text: "",
        isSuccess: false,
      };
      return guesses;
    });

    setNextLetter((nex) => nex - 1);
  };

  const getTextFromObjectArray = (array) => {
    let text = "";
    // eslint-disable-next-line array-callback-return
    array.map((ele) => {
      text += ele.text;
    });
    return text.toLowerCase();
  };

  const submitGuess = (val, e) => {
    e.preventDefault();
    if (nextLetter !== 5) return;

    if (
      !WORDS.find(
        (word) => word === getTextFromObjectArray(guesses[currentGuess - 1])
      )
    ) {
      toast("Word not found in word dictionary :(", { type: "error" });
      return;
    }

    setGuesses((guesses) => {
      let allSuccess = true;
      let updatedUseChars = {};

      guesses[currentGuess - 1] = Array.from(
        guesses[currentGuess - 1].map((guess, indx) => {
          if (guess.text.toLowerCase() === rightGuessString.charAt(indx)) {
            updatedUseChars[guess.text] = 2;
            return { text: guess.text, isSuccess: true, isWrong: false };
          }
          allSuccess = false;
          if (updatedUseChars[guess.text] !== 2) {
            updatedUseChars[guess.text] = 1;
          }
          return { text: guess.text, isSuccess: false, isWrong: true };
        })
      );

      if (allSuccess) {
        toast("Wow so easy! you have successfully completed the wordle :)", {
          type: "success",
        });

        setTimeout(() => {
          setCurrentGuess(1);
          setNextLetter(0);
          toast("Now you can try next wordle!", { type: "info" });
          setGuesses(
            new Array(6)
              .fill({ text: "", isSuccess: false })
              .map(() => new Array(5).fill({ text: "", isSuccess: false }))
          );
          setUsedChars({});
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }, 5000);
      } else {
        toast("Better luck in next guess!", { type: "info" });
      }

      setUsedChars((obj) => {
        return { ...obj, ...updatedUseChars };
      });

      console.log({ usedChars, updatedUseChars });
      return guesses;
    });

    setCurrentGuess((prevGuess) => prevGuess + 1);
    setNextLetter(0);
  };

  return (
    <div className="App">
      <Header setShowHelpModal={setShowHelpModal} />
      <Grid
        guesses={guesses}
        selectedRowIndx={currentGuess - 1}
        selectedColIndx={nextLetter}
      />
      <Keyboard
        insertChar={insertChar}
        deleteChar={deleteChar}
        submitGuess={submitGuess}
        usedChars={usedChars}
      />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <InfoModal
        showHelpModal={showHelpModal}
        setShowHelpModal={setShowHelpModal}
      />
    </div>
  );
}

export default App;
