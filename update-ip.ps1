# ============================================
# IP Address Updater (Standalone)
# ============================================
# Use this script to ONLY update the IP in vite.config.js
# without starting the servers
# ============================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  IP Address Configuration Updater" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Detect IP Address
Write-Host "Detecting your current IP address..." -ForegroundColor Yellow

$ipAddress = (Get-NetIPAddress -AddressFamily IPv4 | 
              Where-Object { $_.IPAddress -ne '127.0.0.1' -and $_.PrefixOrigin -eq 'Dhcp' } | 
              Select-Object -First 1).IPAddress

if (-not $ipAddress) {
    $ipAddress = (Get-NetIPAddress -AddressFamily IPv4 | 
                  Where-Object { $_.IPAddress -ne '127.0.0.1' } | 
                  Select-Object -First 1).IPAddress
}

if (-not $ipAddress) {
    Write-Host "ERROR: Could not detect IP address!" -ForegroundColor Red
    pause
    exit 1
}

Write-Host "Detected IP: $ipAddress" -ForegroundColor Green
Write-Host ""

# Update vite.config.js
Write-Host "Updating vite.config.js..." -ForegroundColor Yellow

$viteConfigPath = "vite.config.js"
$viteConfigBackup = "vite.config.js.backup"

# Create backup (only once)
if (-not (Test-Path $viteConfigBackup)) {
    Copy-Item $viteConfigPath $viteConfigBackup
    Write-Host "Created backup: vite.config.js.backup" -ForegroundColor Gray
}

# Create new config with detected IP
$newConfig = @"
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 5173,
        hmr: {
            host: '$ipAddress',
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
"@

Set-Content -Path $viteConfigPath -Value $newConfig

Write-Host "✓ Successfully updated vite.config.js" -ForegroundColor Green
Write-Host ""
Write-Host "Your new IP: $ipAddress" -ForegroundColor Cyan
Write-Host ""
Write-Host "You can now run:" -ForegroundColor Yellow
Write-Host "  - Desktop: http://localhost:8000" -ForegroundColor White
Write-Host "  - Mobile:  http://$ipAddress:8000" -ForegroundColor White
Write-Host ""
pause
