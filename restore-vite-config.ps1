# ============================================
# Restore Original Vite Config
# ============================================
# Use this to restore the original vite.config.js
# (for desktop-only development)
# ============================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Restore Original Vite Configuration" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$viteConfigPath = "vite.config.js"
$viteConfigBackup = "vite.config.js.backup"

if (Test-Path $viteConfigBackup) {
    Copy-Item $viteConfigBackup $viteConfigPath -Force
    Write-Host "✓ Restored original vite.config.js" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your vite.config.js is now back to desktop-only mode." -ForegroundColor White
} else {
    Write-Host "No backup found. Creating default config..." -ForegroundColor Yellow
    
    $defaultConfig = @"
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
    ],
});
"@
    
    Set-Content -Path $viteConfigPath -Value $defaultConfig
    Write-Host "✓ Created default vite.config.js" -ForegroundColor Green
}

Write-Host ""
pause
