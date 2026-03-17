import styles from "./ModalOverlay.module.css";

type ModalOverlayProps = {
  onClick: () => void;
  showContent: boolean;
};

// Рендерит затемняющую подложку модального окна и закрывает его по клику.
const ModalOverlay = ({ onClick, showContent }: ModalOverlayProps) => {
  const overlayClassName = showContent
    ? `${styles.modalOverlay} ${styles.showModalOverlay}`
    : styles.modalOverlay;

  return <div className={overlayClassName} onClick={onClick} aria-hidden="true" />;
};

export default ModalOverlay;
