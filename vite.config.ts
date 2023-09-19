import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000,
    open: true
    // proxy: {
    //   "/github": {
    //     target: "https://github.com/gzdl-strive/gzdl-strive",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/github/, '')
    //   }
    // }
  },
  resolve: {
    alias: {
      "@c": path.resolve(__dirname, "./src/components"),
      "@s": path.resolve(__dirname, "./src/styles"),
      "@u": path.resolve(__dirname, "./src/utils"),
      "@cfg": path.resolve(__dirname, "./src/config"),
      "@l": path.resolve(__dirname, "./src/layout"),
      "@v": path.resolve(__dirname, "./src/views"),
      "@r": path.resolve(__dirname, "./src/router"),
      "@a": path.resolve(__dirname, "./src/assets"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@h": path.resolve(__dirname, "./src/hooks"),
      "@m": path.resolve(__dirname, "./src/mock")
    }
  }
});
