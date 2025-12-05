// Auto-detect IP and update vite.config.js
import { networkInterfaces } from "os";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get IP address
function getLocalIP() {
    const nets = networkInterfaces();
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip internal and non-IPv4 addresses
            if (net.family === "IPv4" && !net.internal) {
                return net.address;
            }
        }
    }
    return "localhost";
}

const ip = getLocalIP();
console.log(`\n✅ Detected IP: ${ip}\n`);

// Update vite.config.js
const viteConfigPath = join(__dirname, "vite.config.js");
const viteConfig = `import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 5173,
        hmr: {
            host: '${ip}',
        },
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
    ],
});
`;

writeFileSync(viteConfigPath, viteConfig);
console.log(`✅ Updated vite.config.js with IP: ${ip}\n`);
console.log(`📱 Mobile URL: http://${ip}:8000\n`);
