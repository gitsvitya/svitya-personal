import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  type Dispatch,
  type ReactElement,
  type ReactNode,
  type SetStateAction,
} from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";

type ModalProps = {
  children: ReactNode;
  overlayControls?: ReactNode;
  closeModal: () => void;
  showContent: boolean;
  setShowContent: Dispatch<SetStateAction<boolean>>;
  closeLabel: string;
};

const Modal = ({
  children,
  overlayControls,
  closeModal,
  showContent,
  setShowContent,
  closeLabel,
}: ModalProps) => {
  const container = document.getElementById("modal");
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const prevFocusedRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    setShowContent(true);
  }, [setShowContent]);

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
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        ref={modalRef}
      >
        <button
          type="button"
          className={styles.closeIcon}
          onClick={closeModal}
          aria-label={closeLabel}
          ref={closeBtnRef}
        />
        {overlayControls}

        <div className={styles.modalBody}>
          {renderModalChildren(children, titleId, descriptionId)}
        </div>
      </div>
      <ModalOverlay onClick={closeModal} showContent={showContent} />
    </>,
    container
  );
};

function renderModalChildren(children: ReactNode, titleId: string, descriptionId: string) {
  if (!isValidElement(children) || typeof children.type === "string") {
    return children;
  }

  return cloneElement(children as ReactElement<Record<string, unknown>>, {
    titleId,
    descriptionId,
  });
}

export default Modal;
