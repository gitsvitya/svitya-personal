import React from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import About from "../About/About";
import Projects from "../Projects/Projects";
import AppFooter from "../AppFooter/AppFooter";
import { rusLng, engLng } from "../../utils/lng";

function App() {
  const [Language, ChangeLanguage] = React.useState("en");

  let currentText = engLng;
  console.log(Language);

  if (Language === "en") currentText = engLng;
  else currentText = rusLng;

  return (
    <div className={styles.page}>
      <AppHeader
        text={currentText}
        ChangeLanguage={ChangeLanguage}
        Language={Language}
      ></AppHeader>
      <main>
        <About text={currentText}></About>
        <Projects text={currentText}></Projects>
      </main>
      <AppFooter text={currentText}></AppFooter>
    </div>
  );
}

export default App;
