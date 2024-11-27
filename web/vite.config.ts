import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.woff', '**/*.woff2'],
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": "/src",
    },
  }
});
