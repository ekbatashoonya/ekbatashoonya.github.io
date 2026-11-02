/**
 * Build-time server entry.
 *
 * Loaded by vite-plugin-static-routes.ts after the client bundle is built, to
 * render each route to an HTML string that is written into that route's
 * index.html. Crawlers and AI assistants that do not run JavaScript then see
 * the real page content, and the browser hydrates the same markup.
 */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppShell } from "./App";

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppShell />
    </StaticRouter>
  );
}
