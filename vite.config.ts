// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Static prerender for GitHub Pages — emits a static index.html at build time.
    pages: [{ path: "/", prerender: { enabled: true, crawlLinks: true } }],
  },
  // Disable the Cloudflare Worker / nitro server bundle — GitHub Pages is static-only.
  nitro: false,
});
