import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../assets/scss/all.scss";
import "bootstrap";
import AboutStudio from "./AboutStudio";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AboutStudio />
  </StrictMode>
);