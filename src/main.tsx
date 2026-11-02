import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;

// Route pages are prerendered to static HTML at build time (see
// vite-plugin-static-routes.ts), so hydrate instead of re-rendering from
// scratch. The root path "/" only redirects client-side to the saved
// language mode, so its prerendered markup is replaced rather than hydrated.
const isPrerendered = container.hasChildNodes() && window.location.pathname !== "/";

if (isPrerendered) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
