import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      external: [
        "@rollup/rollup-linux-x64-gnu",
        "@rollup/rollup-win32-x64-msvc",
        "@rollup/rollup-darwin-x64",
        "@rollup/rollup-darwin-arm64",
      ],
      output: {
        manualChunks: undefined,
      },
    },
    target: "es2015",
    minify: "esbuild",
    commonjsOptions: {
      include: [],
    },
  },
  optimizeDeps: {
    exclude: [
      "@rollup/rollup-linux-x64-gnu", 
      "@rollup/rollup-win32-x64-msvc",
      "@rollup/rollup-darwin-x64",
      "@rollup/rollup-darwin-arm64"
    ],
  },
  define: {
    global: "globalThis",
  },
  ssr: {
    noExternal: ['react', 'react-dom']
  }
});
