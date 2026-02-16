import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { staticRoutesPlugin } from "./vite-plugin-static-routes";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // For GitHub Pages user site deployment (root domain)
  // For user sites (username.github.io), base should be "/"
  base: "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    staticRoutesPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Allow importing .md files as raw strings
  assetsInclude: ["**/*.md"],
}));
