import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

export default defineConfig({
  plugins: [
    react(),
    obfuscatorPlugin({
      options: {
        compact: true,
        controlFlowFlattening: true,
        debugProtection: true,
        selfDefending: true,
      },
    }),
  ],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
