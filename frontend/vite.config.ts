import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import commonjs from 'vite-plugin-commonjs';
import path from "path";

export default defineConfig({
  plugins: [
    commonjs(),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app/"),
    },
  },
  server: {
    cors: {
      origin: process.env.WHITELIST_ORIGIN,
      credentials: true,
    },
  },
});
