import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";

import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";

export default defineConfig({
  plugins: [vue()],
  base: "./",
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      vue: "vue/dist/vue.esm-bundler",
    },
  },
});
