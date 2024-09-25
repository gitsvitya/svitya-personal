import styles from "./Title.module.css";

function Title(props) {
  return (
    <div className={styles.title}>
      <div className={styles.container}>
        <div className={styles.photo}></div>
        <div className={styles.textBlock}>
          <h1 className={styles.header}>{props.text.titleBlockHeader}</h1>
          <p className={styles.paragraph}>{props.text.titleBlockSubHeader}</p>
        </div>
      </div>
    </div>
  );
}

export default Title;
