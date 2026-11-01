/**
 * Prerendering safety net: every route must render to real HTML at build
 * time, and the browser must be able to hydrate that markup without React
 * reporting a mismatch (which would force a full client re-render).
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { act } from "react";
import { hydrateRoot, type Root } from "react-dom/client";
import App from "@/App";
import { render as renderToHtml } from "@/entry-server";

/** Server render with react-dom/server's dev-only useLayoutEffect warning silenced. */
function render(url: string): string {
  const original = console.error;
  console.error = (...args: unknown[]) => {
    if (String(args[0]).includes("useLayoutEffect does nothing on the server")) return;
    original(...args);
  };
  try {
    return renderToHtml(url);
  } finally {
    console.error = original;
  }
}

const ROUTES = [
  "/hi-mixed/",
  "/hi-mixed/courses/",
  "/hi-mixed/courses/mathematical-logic/",
  "/hi-mixed/courses/mathematical-logic/logic-lecture-0/",
  "/hi-mixed/blog/introduction/",
  "/hi-shuddh/about/",
  "/en/blog/",
  "/en/courses/mathematical-logic/logic-lecture-0/", // not available in en → fallback page
];

let root: Root | undefined;

afterEach(() => {
  act(() => root?.unmount());
  root = undefined;
  document.body.innerHTML = "";
  localStorage.clear();
});

describe("prerendered routes", () => {
  it.each(ROUTES)("%s renders meaningful content on the server", (url) => {
    const html = render(url);
    expect(html.length).toBeGreaterThan(2000);
    expect(html).toContain("<main");
  });

  it("lecture page includes the lecture body and KaTeX math", () => {
    const html = render("/hi-mixed/courses/mathematical-logic/logic-lecture-0/");
    expect(html).toContain("Truth Values");
    expect(html).toContain("katex");
  });

  it.each(ROUTES)("%s hydrates without mismatch errors", async (url) => {
    const serverHtml = render(url);

    const errors: string[] = [];
    const spy = vi.spyOn(console, "error").mockImplementation((...args: unknown[]) => {
      errors.push(args.map(String).join(" "));
    });

    window.history.replaceState({}, "", url);
    const container = document.createElement("div");
    container.id = "root";
    container.innerHTML = serverHtml;
    document.body.appendChild(container);

    await act(async () => {
      root = hydrateRoot(container, <App />, {
        onRecoverableError: (err) => errors.push(`recoverable: ${String(err)}`),
      });
    });

    spy.mockRestore();
    const hydrationErrors = errors.filter((e) => /hydrat|did not match|recoverable/i.test(e));
    expect(hydrationErrors).toEqual([]);
    expect(container.querySelector("main")).not.toBeNull();
  });
});
