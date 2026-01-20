import { defineConfig } from "vite";
import { vitend } from "vitend/vite";

export default defineConfig({
    server: {
        port: 3001,
    },
    plugins: [
        vitend({
            copyPublicDir: true,
        }),
    ],
});
