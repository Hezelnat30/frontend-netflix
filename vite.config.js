import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@public": path.resolve(__dirname, "./public"),
      "@modules": path.resolve(__dirname, "src/components/Modules"),
      "@layouts": path.resolve(__dirname, "src/components/Layouts"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api.themoviedb.org/3",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
