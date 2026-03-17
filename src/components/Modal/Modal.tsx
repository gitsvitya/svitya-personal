import { useEffect, useRef, type Dispatch, type ReactNode, type SetStateAction } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";

type ModalProps = {
  children: ReactNode;
  closeModal: () => void;
  showContent: boolean;
  setShowContent: Dispatch<SetStateAction<boolean>>;
};

// Рендерит модальное окно через портал и управляет клавиатурным взаимодействием.
const Modal = ({ children, closeModal, showContent, setShowContent }: ModalProps) => {
  const container = document.getElementById("modal");
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const prevFocusedRef = useRef<HTMLElement | null>(null);

  // Запускает анимацию появления после монтирования компонента.
  useEffect(() => {
    setShowContent(true);
  }, [setShowContent]);

  // Закрывает модалку по Escape и удерживает фокус внутри окна по Tab.
  useEffect(() => {
    function closeModalByEsc(evt: KeyboardEvent) {
      if (evt.key === "Escape") closeModal();
    }

    function trapFocus(evt: KeyboardEvent) {
      if (evt.key !== "Tab") return;
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable.item(0);
      const last = focusable.item(focusable.length - 1);
      if (!first || !last) return;
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
    prevFocusedRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const timer = window.setTimeout(() => {
      if (closeBtnRef.current) closeBtnRef.current.focus();
      else if (modalRef.current) modalRef.current.focus();
    }, 0);

    return () => {
      window.clearTimeout(timer);
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
        />
        <div className={styles.modalBody}>{children}</div>
      </div>
      <ModalOverlay onClick={closeModal} showContent={showContent} />
    </>,
    container
  );
};

export default Modal;
