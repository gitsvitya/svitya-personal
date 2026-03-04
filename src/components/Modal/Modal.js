import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";

// Рендерит модальное окно через портал и управляет клавиатурным взаимодействием.
const Modal = ({ children, closeModal, showContent, setShowContent }) => {
  const container = document.getElementById("modal");
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const prevFocusedRef = useRef(null);

  // Запускает анимацию появления после монтирования компонента.
  useEffect(() => {
    setShowContent(true);
  }, [setShowContent]);

  // Закрывает модалку по Escape и удерживает фокус внутри окна по Tab.
  useEffect(() => {
    function closeModalByEsc(evt) {
      if (evt.key === "Escape") closeModal();
    }

    function trapFocus(evt) {
      if (evt.key !== "Tab") return;
      const focusable = modalRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (evt.shiftKey && active === first) {
        evt.preventDefault();
        last.focus();
      } else if (!evt.shiftKey && active === last) {
        evt.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", closeModalByEsc);
    document.addEventListener("keydown", trapFocus);
    return () => {
      document.removeEventListener("keydown", closeModalByEsc);
      document.removeEventListener("keydown", trapFocus);
    };
  }, [closeModal]);

  // Переносит фокус в модалку при открытии и возвращает его при закрытии.
  useEffect(() => {
    prevFocusedRef.current = document.activeElement;
    const timer = setTimeout(() => {
      if (closeBtnRef.current) closeBtnRef.current.focus();
      else if (modalRef.current) modalRef.current.focus();
    }, 0);

    return () => {
      clearTimeout(timer);
      if (prevFocusedRef.current instanceof HTMLElement) {
        prevFocusedRef.current.focus();
      }
    };
  }, []);

  if (!container) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div
        className={`${styles.modalWindow} ${showContent ? styles.showModalWindow : ""}`}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        ref={modalRef}
      >
        <button
          type="button"
          className={styles.closeIcon}
          onClick={closeModal}
          aria-label="Закрыть модальное окно"
          ref={closeBtnRef}
        ></button>
        <div className={styles.modalBody}>{children}</div>
      </div>
      <ModalOverlay onClick={closeModal} showContent={showContent} />
    </>,
    container
  );
};

export default Modal;
