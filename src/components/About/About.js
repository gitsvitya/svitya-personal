import react from 'react';
import styles from './About.module.css'

function About() {
  return (
    <div className={styles.about}>
      <div className={styles.photo}></div>
      <div className={styles.text}>
        <h1 className={styles.header}>Виктор Строков</h1>
        <h2 className={styles.subheader}>Продуктовый маркетинг, управление проектами, аналитика и исследования.</h2>
      </div>
    </div>
  )
}

export default About;
