import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import { BrowserRouter } from "react-router-dom";

// Берём заранее установленную тему из data-theme (ставится скриптом в head), чтобы стартовать без мигания.
const initialTheme = (() => {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") || "light";
})();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App initialTheme={initialTheme} />
    </BrowserRouter>
  </React.StrictMode>
);
