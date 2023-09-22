import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: true,
    __APP_ENV__: process.env.VITE_APP_API_LINK,
  },
});
