import styles from "./ModalOverlay.module.css";


const ModalOverlay = ({ onClick, showContent }) => {

  return <div className={`${styles.modalOverlay} ${showContent && styles.showModalOverlay}`} onClick={onClick}></div>;
};

export default ModalOverlay;
