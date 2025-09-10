import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
    await viteConfig({ command: "build", mode: "" }),
    defineConfig({
        test: {
            environment: "jsdom",
            exclude: [...configDefaults.exclude, "e2e/*"],
            root: fileURLToPath(new URL("./", import.meta.url)),
            reporters: ["default", "junit"],
            outputFile: "junit.xml",
            unstubEnvs: true,
            unstubGlobals: true,
            globals: true,
            server: {
                deps: {
                    inline: ["vuetify"]
                }
            }
        }
    })
);
