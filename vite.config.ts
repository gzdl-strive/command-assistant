import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000,
    open: true
  },
  resolve: {
    alias: {
      "@c": path.resolve(__dirname, "./src/components"),
      "@s": path.resolve(__dirname, "./src/styles"),
      "@u": path.resolve(__dirname, "./src/utils"),
      "@cfg": path.resolve(__dirname, "./src/config"),
      "@l": path.resolve(__dirname, "./src/layout"),
      "@v": path.resolve(__dirname, "./src/views")
    }
  }
});
