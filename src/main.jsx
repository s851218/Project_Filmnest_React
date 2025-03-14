import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/scss/all.scss";
import "bootstrap";
import "swiper/css/bundle";
import { RouterProvider } from "react-router";
import router from "./routes";
import { Provider } from "react-redux";
import { store } from "./store";
// Quill 文字編輯器 theme css
import "quill/dist/quill.core.css";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
