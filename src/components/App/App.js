import React from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import Title from "../Title/Title";
import ProjectsExp from "../ProjectsExp/ProjectsExp";
import AppFooter from "../AppFooter/AppFooter";
import WorkExp from "../WorkExp/WorkExp";
import { rusLng, engLng } from "../../utils/lng";

function App() {
  const [Language, ChangeLanguage] = React.useState("en");

  // let test = window.navigator.language;
  let currentText = engLng;
  if (Language === "ru") currentText = engLng;
  else currentText = rusLng;

  return (
    <div className={styles.page}>
      <AppHeader
        text={currentText}
        ChangeLanguage={ChangeLanguage}
        Language={Language}
      ></AppHeader>
      <main>
        <Title text={currentText}></Title>
        <WorkExp text={currentText}></WorkExp>
        <ProjectsExp text={currentText}></ProjectsExp>
      </main>
      <AppFooter text={currentText}></AppFooter>
    </div>
  );
}

export default App;
