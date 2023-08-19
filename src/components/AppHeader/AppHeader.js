import react from 'react';
import styles from './AppHeader.module.css';

function AppHeader() {
  return (
    <header className={styles.header}>
      <button className={styles.lngChanger}>En</button>
    </header>
  )
}

export default AppHeader;
