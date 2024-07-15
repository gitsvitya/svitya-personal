import react from "react";
import styles from "./Projects.module.css";

function Projects(props) {
  return (
    <div className={styles.projects}>
      <div className={styles.container}>
        <p className={styles.text}>
          {props.text.projectBlockWorkNowText}
          <a className={styles.link} href="https://namex.org/" target="_blank">
            {props.text.projectBlockWorkLink}
          </a>
          .
        </p>
        <p className={styles.text}>
          {props.text.projectBlockUsedToWorkText}
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
        <p className={styles.text}>
          {props.text.projectBlockFoundedText}
          <a
            className={styles.link}
            href="https://www.mappngo.com/"
            target="_blank"
          >
            {props.text.projectBlockFoundedTextMappNgo}
          </a>
          ,{" "}
          <a className={styles.link} href="https://venivi.ru/" target="_blank">
            {props.text.projectBlockFoundedTextVenivi}
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default Projects;
