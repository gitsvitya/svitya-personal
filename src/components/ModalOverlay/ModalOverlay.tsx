import styles from "./ModalOverlay.module.css";

type ModalOverlayProps = {
  onClick: () => void;
  showContent: boolean;
};

// Подложка затемняет фон и позволяет закрыть модалку кликом вне окна.
const ModalOverlay = ({ onClick, showContent }: ModalOverlayProps) => {
  // Дополнительный класс включает анимацию прозрачности синхронно с содержимым диалога.
  const overlayClassName = showContent
    ? `${styles.modalOverlay} ${styles.showModalOverlay}`
    : styles.modalOverlay;

  return <div className={overlayClassName} onClick={onClick} aria-hidden="true" />;
};

export default ModalOverlay;
