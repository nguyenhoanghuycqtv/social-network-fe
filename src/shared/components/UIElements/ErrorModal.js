import React from "react";
import ReactDOM from "react-dom";
import "./ErrorModal.css";

const ErrorModal = (props) => {
  const content = (
    <div className="modal">
      <header className="modal__header">
        <h2>An error occurred</h2>
      </header>
      <form>
        <div className="modal__content">{props.error}</div>
        <footer className="modal__footer">Please Try Again</footer>
      </form>
      <button onClick={props.onClick}>OK</button>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

export default ErrorModal;
