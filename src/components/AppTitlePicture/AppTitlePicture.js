import styles from "./AppTitlePicture.module.css";

function AppTitlePicture(props) {
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

export default AppTitlePicture;
