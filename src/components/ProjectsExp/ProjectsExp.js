import styles from "./ProjectsExp.module.css";

function ProjectsExp(props) {
  return (
    <div className={styles.projectsExp}>
      <div className={styles.container}>
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

export default ProjectsExp;
