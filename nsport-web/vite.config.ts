import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// PORT is only used for local development (`vite`/`vite preview`).
// Vercel builds a static bundle and serves it directly — it never runs
// this dev/preview server, so no PORT env var is required in production.
const localPort = Number(process.env.PORT) || 3000;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: localPort,
    host: true,
  },
  preview: {
    port: localPort,
    host: true,
  },
});
