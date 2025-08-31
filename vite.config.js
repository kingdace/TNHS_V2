import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.jsx"],
            refresh: true,
        }),
        react({
            jsxRuntime: "automatic",
            jsxImportSource: "react",
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./resources/js"),
        },
    },
    optimizeDeps: {
        include: ["react", "react-dom", "react-router-dom"],
    },
    server: {
        hmr: true,
        watch: {
            usePolling: true,
        },
    },
});
