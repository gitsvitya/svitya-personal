import styles from "./ModalOverlay.module.css";


const ModalOverlay = ({ onClick, showContent }) => {
  const overlayClassName = showContent
    ? `${styles.modalOverlay} ${styles.showModalOverlay}`
    : styles.modalOverlay;

  return <div className={overlayClassName} onClick={onClick}></div>;
};

export default ModalOverlay;
