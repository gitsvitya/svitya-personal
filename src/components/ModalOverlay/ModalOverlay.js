import styles from "./ModalOverlay.module.css";

const ModalOverlay = ({ onClick }) => {
  return <div className={styles.modalOverlay} onClick={onClick}></div>;
};

export default ModalOverlay;
