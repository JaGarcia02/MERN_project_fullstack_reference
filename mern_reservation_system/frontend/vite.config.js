import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import WindiCss from "vite-plugin-windicss";
import pluginRewriteAll from "vite-plugin-rewrite-all";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), WindiCss(), pluginRewriteAll()],
  server: {
    host: true,
    proxy: {
      "/server": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/server/, ""),
      },
    },
  },
});
