import {useEffect} from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";

const Modal = ({ children, closeModal, showContent, setShowContent }) => {
  const container = document.querySelector("#modal");

  useEffect(() => {
    setShowContent(true);
  }, [])

  useEffect(() => {
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
      <div className={`${styles.modalWindow} ${showContent && styles.showModalWindow}`}>
        <button
          type="button"
          className={styles.closeIcon}
          onClick={closeModal}
          aria-label="Закрыть модальное окно"
        ></button>
        {children}
      </div>
      <ModalOverlay onClick={closeModal} showContent = {showContent} />
    </>,
    container
  );
};

export default Modal;
