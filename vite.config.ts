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
  },
  build: {
    sourcemap: false,
    // 默认使用esbuild 
    // 使用terser后index.xxx.js从 1004kb 降到 994kb
    minify: "terser",
    emptyOutDir: true, // 打包时清空上一次构建的目录
    chunkSizeWarningLimit: 1000,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
          const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
          return `js/${fileName}/[name].[hash].js`;
        }
      }
    }
  },
});
