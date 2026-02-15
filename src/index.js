import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import { HashRouter } from "react-router-dom";

// Берём заранее установленную тему из data-theme (ставится скриптом в head), чтобы стартовать без мигания.
const initialTheme = (() => {
  if (typeof document === "undefined") return "light";

  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;

  return document.documentElement.getAttribute("data-theme") || "light";
})();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App initialTheme={initialTheme} />
    </HashRouter>
  </React.StrictMode>
);
