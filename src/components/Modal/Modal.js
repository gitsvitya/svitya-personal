import React from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";

const Modal = ({ children, closeModal }) => {
  const container = document.querySelector("#modal");

  React.useEffect(() => {
    function closeModalByEsc(evt) {
      evt.key === "Escape" && closeModal();
    }

    document.addEventListener("keydown", closeModalByEsc);
    return () => {
      document.removeEventListener("keydown", closeModalByEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modalWindow}>
        <div className={styles.closeIcon} onClick={closeModal}></div>
        {children}
      </div>
      <ModalOverlay onClick={closeModal} />
    </>,
    container
  );
};

export default Modal;
