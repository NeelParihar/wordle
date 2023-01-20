import React from "react";
import Modal from "react-modal";
import "./InfoModal.css";
import GridItem from "../Grid/GridItem";
import { useEffect } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "var(--bg-color)",
    color: "#fff",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgb(60, 42, 33,0.5)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

export default function InfoModal({ showHelpModal, setShowHelpModal }) {
  const [modalIsOpen, setIsOpen] = React.useState(true);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setShowHelpModal(false);
  }

  useEffect(() => {
    if (showHelpModal) {
      openModal();
    }
  }, [showHelpModal]);

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="container">
          <h2 className="heading">How to play?</h2>
          <button onClick={closeModal} className="close">
            X
          </button>

          <p className="description">
            Guess the word in 6 tries. After each guess, the color of the tiles
            will change to show how close your guess was to the word.
          </p>

          <div className="grid">
            <GridItem ele={{ text: "N", isSuccess: true }} />
            <GridItem ele={{ text: "E" }} />
            <GridItem ele={{ text: "E" }} />
            <GridItem ele={{ text: "D" }} />
            <GridItem ele={{ text: "S" }} />
          </div>
          <p className="description">
            The letter `N` is in the word and in the correct spot.
          </p>

          <div className="grid">
            <GridItem ele={{ text: "W" }} />
            <GridItem ele={{ text: "A" }} />
            <GridItem ele={{ text: "L" }} />
            <GridItem ele={{ text: "K", isWrong: true }} />
            <GridItem ele={{ text: "S" }} />
          </div>
          <p className="description">
            The letter `K` is not in the word in any spot.
          </p>
        </div>
      </Modal>
    </div>
  );
}
