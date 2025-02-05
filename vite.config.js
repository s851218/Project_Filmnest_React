import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/Project_Filmnest_React/" : "/", // 加入此段程式碼
  plugins: [react()],
});
