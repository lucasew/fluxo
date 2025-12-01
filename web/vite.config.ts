import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import relay from "vite-plugin-relay";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwind(), react(), relay],
  server: {
    port: 5173,
    proxy: {
      "/graphql": {
        target: "http://localhost:8080",
        changeOrigin: true,
        ws: true,
      },
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
