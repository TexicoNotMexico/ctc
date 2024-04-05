import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: { port: 3330 }, // ３イバー３ダー３イダーアアアアー
    base: "/ctc/",
});
