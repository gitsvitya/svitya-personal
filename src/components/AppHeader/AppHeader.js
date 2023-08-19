import styles from "./AppHeader.module.css";

function AppHeader(props) {
  let nextLng = "";

  if (props.Language === "ru") nextLng = "en";
  else nextLng = "ru";

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button
          className={styles.lngChanger}
          onClick={() => {
            props.ChangeLanguage(`${nextLng}`);
          }}
        >
          {props.text.appHeaderLangButton}
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
