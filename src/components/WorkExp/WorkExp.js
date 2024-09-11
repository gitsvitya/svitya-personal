import styles from "./WorkExp.module.css";

function WorkExp(props) {
  return (
    <div className={styles.workExp}>
      <div className={styles.container}>
      <p className={styles.text}>
          {props.text.projectBlockUsedToWorkText}
          <a className={styles.link} href="https://namex.org/" target="_blank">
            {props.text.projectBlockUsedToWorkTextNTB}
          </a>
          ,{" "}
          <a
            className={styles.link}
            href="https://trading.lukoil.ru/"
            target="_blank"
          >
            {props.text.projectBlockUsedToWorkTextLRNPT}
          </a>
          ,{" "}
          <a
            className={styles.link}
            href="https://kalashnikovgroup.ru/"
            target="_blank"
          >
            {props.text.projectBlockUsedToWorkTextKG}
          </a>
          ,{" "}
          <a
            className={styles.link}
            href="https://www.thomsonreuters.com/"
            target="_blank"
          >
            {props.text.projectBlockUsedToWorkTextTR}
          </a>
          .
        </p>
      </div>
    </div>
  )
}

export default WorkExp;
