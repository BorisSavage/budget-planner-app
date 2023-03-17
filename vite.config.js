import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            components: "/src/components",
            contexts: "/src/contexts",
            hooks: "/src/hooks",
        },
    },
});
