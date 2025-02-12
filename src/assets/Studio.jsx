import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../assets/scss/all.scss";
import "../assets/scss/studio.scss"
import "bootstrap";
import StudioProfile from "./StudioProfile";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StudioProfile />
    <StudioProfile />
    123
  </StrictMode>
);
