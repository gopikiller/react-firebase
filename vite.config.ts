import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    const envWithProcessPrefix = Object.entries(env).reduce(
        (prev, [key, val]) => {
            return {
                ...prev,
                ["process.env." + key]: `"${val}"`,
            };
        },
        {}
    );
    return {
        server: {
            host: "localhost",
            port: 3000,
        },
        preview: {
            port: 8080,
        },
        define: envWithProcessPrefix,
        plugins: [react()],
        build: {
            sourcemap: false,
            outDir: "build",
            minify: "esbuild",
        },
    };
});
