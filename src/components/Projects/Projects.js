import react from 'react';
import styles from './Projects.module.css'

function Projects() {
  return(
    <div className={styles.projects}>
      <p className={styles.text}>Сейчас работаю в <a className={styles.link} href='https://namex.org/' target='_blank'>Национальной товарной бирже</a>.</p>
      <p className={styles.text}>Раньше работал в: <a className={styles.link} href='https://maxconf.ru/' target='_blank'>MaxConference</a>, <a className={styles.link} href='https://www.thomsonreuters.com/' target='_blank'>Tomson Reuters</a>, <a className={styles.link} href='https://kalashnikovgroup.ru/' target='_blank'>Концерне Калашников</a>, <a className={styles.link} href='https://trading.lukoil.ru/' target='_blank'>Лукойл-РНП-Трейдинг</a>.</p>
      <p className={styles.text}>Также запускал собственные проекты: <a className={styles.link} href='https://venivi.ru/' target='_blank'>Venivi.ru</a>, <a className={styles.link} href='https://www.mappngo.com/' target='_blank'>MappNgo</a>.</p>
    </div>
  )
}

export default Projects;
