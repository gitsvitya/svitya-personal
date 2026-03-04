import styles from "./ModalOverlay.module.css";

// Рендерит затемняющую подложку модального окна и закрывает его по клику.
const ModalOverlay = ({ onClick, showContent }) => {
  const overlayClassName = showContent
    ? `${styles.modalOverlay} ${styles.showModalOverlay}`
    : styles.modalOverlay;

  return <div className={overlayClassName} onClick={onClick} aria-hidden="true"></div>;
};

export default ModalOverlay;
