import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import vueMacros from "unplugin-vue-macros/vite";
import autoImport from "unplugin-auto-import/vite";
import { execSync } from "child_process";

import { nodePolyfills } from "vite-plugin-node-polyfills";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(() => {
  process.env.VITE_BUILD_DATE = new Date().toISOString();
  process.env.VITE_BRANCH = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();

  return {
    base: "./",
    plugins: [
      // https://www.npmjs.com/package/rollup-plugin-visualizer
      visualizer({
        template: "treemap",
        open: false,
        gzipSize: true,
        brotliSize: true,
        filename: "dist/analyse.html"
      }),
      // https://www.npmjs.com/package/vite-plugin-node-polyfills
      nodePolyfills({
        include: ["path"]
      }),
      // https://vue-macros.sxzz.moe/guide/bundler-integration.html
      vueMacros({
        plugins: {
          vue: vue({ template: { transformAssetUrls } })
        }
      }),
      // https://www.npmjs.com/package/unplugin-auto-import
      autoImport({
        dts: "typings/auto-imports.d.ts",
        imports: ["vue", "pinia", "vue-router"]
      }),
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
      vuetify({
        autoImport: true,
        styles: { configFile: "src/styles/settings.scss" }
      })
    ],
    build: {
      target: "esnext",
      rollupOptions: {
        output: {
          manualChunks: (id: string) => {
            if (id.match(/elkjs/)) return "elkjs";
          }
        }
      }
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
      }
    },
    server: {
      port: 8080,
      proxy: {
        "/api": {
          target: "http://localhost:5000",
          changeOrigin: true
        }
      }
    }
  };
});
