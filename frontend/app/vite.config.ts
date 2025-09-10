import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import autoImport from "unplugin-auto-import/vite";
import { execSync } from "child_process";

import { nodePolyfills } from "vite-plugin-node-polyfills";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(async () => {
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
            // https://www.npmjs.com/package/@vitejs/plugin-vue
            vue({ template: { transformAssetUrls } }),
            // https://www.npmjs.com/package/unplugin-auto-import
            autoImport({
                dts: "typings/auto-imports.d.ts",
                imports: [
                    "vue",
                    "pinia",
                    "vue-router",
                    {
                        "@mdi/js": Object.keys(await import("@mdi/js")).filter((x) => x.startsWith("mdi"))
                    }
                ],
                vueTemplate: true,
                viteOptimizeDeps: false
            }),
            // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
            vuetify({
                autoImport: true,
                styles: { configFile: "src/styles/settings.scss" }
            })
        ],
        build: {
            target: "esnext"
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
                "/api/api": {
                    target: "http://localhost:5100",
                    changeOrigin: true,
                    rewrite: (path: string) => path.replace(/^\/api/, "")
                }
            }
        }
    };
});
