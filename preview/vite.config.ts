import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "./src") } },
  server: { host: "127.0.0.1", port: 5187, strictPort: true },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "react-vendor",
              test: /\/node_modules\/(?:react(?:-dom|-router|-router-dom)?|scheduler)\//,
              priority: 20,
            },
            {
              name: "scroll-vendor",
              test: /\/node_modules\/(?:gsap|@gsap\/react|lenis)\//,
              priority: 10,
            },
          ],
        },
      },
    },
  },
});
