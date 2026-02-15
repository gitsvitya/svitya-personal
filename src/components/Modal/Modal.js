import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";

// Обёртка модального окна: монтирует содержимое в портал и управляет анимацией/закрытием.
const Modal = ({ children, closeModal, showContent, setShowContent }) => {
  const container = document.getElementById("modal");
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const prevFocusedRef = useRef(null);

  // Запускаем появление контента после монтирования.
  useEffect(() => {
    setShowContent(true);
  }, [setShowContent]);

  // Позволяем закрыть модалку по Esc.
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

  // Фокус: запоминаем предыдущий элемент, переводим фокус в модалку и возвращаем при закрытии.
  useEffect(() => {
    prevFocusedRef.current = document.activeElement;
    // Ждём отрисовку класса show и потом ставим фокус на крестик (если есть) или окно.
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
