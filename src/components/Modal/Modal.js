import { useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";

// Обёртка модального окна: монтирует содержимое в портал и управляет анимацией/закрытием.
const Modal = ({ children, closeModal, showContent, setShowContent }) => {
  const container = document.getElementById("modal");

  // Запускаем появление контента после монтирования.
  useEffect(() => {
    setShowContent(true);
  }, [setShowContent]);

  // Позволяем закрыть модалку по Esc.
  useEffect(() => {
    function closeModalByEsc(evt) {
      evt.key === "Escape" && closeModal();
    }

    document.addEventListener("keydown", closeModalByEsc);
    return () => {
      document.removeEventListener("keydown", closeModalByEsc);
    };
  }, [closeModal]);

  if (!container) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div
        className={`${styles.modalWindow} ${showContent && styles.showModalWindow}`}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
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
