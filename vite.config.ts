import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const port = 5000;
const basePath = process.env.BASE_PATH ?? "/";

function deferCss() {
  return {
    name: "defer-css",
    transformIndexHtml: {
      order: "post" as const,
      handler(html: string) {
        return html.replace(
          /<link rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/,
          (_match, href) =>
            `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">` +
            `<noscript><link rel="stylesheet" href="${href}"></noscript>`
        );
      },
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss(), deferCss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "src/assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
            return "vendor";
          }
          if (id.includes("node_modules/framer-motion")) {
            return "motion";
          }
        },
      },
    },
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});