import styles from "./About.module.css";

function About(props) {
  return (
    <div className={styles.about}>
      <div className={styles.container}>
        <div className={styles.photo}></div>
        <div className={styles.text}>
          <h1 className={styles.header}>{props.text.aboutBlockHeader}</h1>
          <h2 className={styles.subheader}>{props.text.aboutBlockSubHeader}</h2>
        </div>
      </div>
    </div>
  );
}

export default About;
