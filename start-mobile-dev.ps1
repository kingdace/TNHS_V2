# ============================================
# Mobile Development Server (With Hot Reload)
# ============================================
# This version properly configures Vite for mobile
# with hot reload support!
# ============================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Mobile Dev Server (Hot Reload Mode)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Detect IP Address
Write-Host "[1/5] Detecting your IP address..." -ForegroundColor Yellow

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

Write-Host "   Detected IP: $ipAddress" -ForegroundColor Green
Write-Host ""

# Step 2: Backup and update .env
Write-Host "[2/5] Updating .env configuration..." -ForegroundColor Yellow

$envPath = ".env"
$envBackup = ".env.mobile.backup"

# Create backup (only once)
if (-not (Test-Path $envBackup)) {
    Copy-Item $envPath $envBackup
    Write-Host "   Created backup: .env.mobile.backup" -ForegroundColor Gray
}

# Read .env
$envContent = Get-Content $envPath -Raw

# Update APP_URL
$envContent = $envContent -replace "APP_URL=.*", "APP_URL=http://$ipAddress"

# Update VITE_API_BASE_URL
$envContent = $envContent -replace "VITE_API_BASE_URL=.*", "VITE_API_BASE_URL=http://$ipAddress:8000"

# Update VITE_APP_URL
$envContent = $envContent -replace "VITE_APP_URL=.*", "VITE_APP_URL=http://$ipAddress"

# Write updated .env
Set-Content -Path $envPath -Value $envContent
Write-Host "   Updated .env with IP: $ipAddress" -ForegroundColor Green
Write-Host ""

# Step 3: Update vite.config.js
Write-Host "[3/5] Updating vite.config.js..." -ForegroundColor Yellow

$viteConfigPath = "vite.config.js"
$viteConfigBackup = "vite.config.js.backup"

# Create backup (only once)
if (-not (Test-Path $viteConfigBackup)) {
    Copy-Item $viteConfigPath $viteConfigBackup
    Write-Host "   Created backup: vite.config.js.backup" -ForegroundColor Gray
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
Write-Host "   Updated vite.config.js with IP: $ipAddress" -ForegroundColor Green
Write-Host ""

# Step 4: Clear Laravel cache
Write-Host "[4/5] Clearing Laravel cache..." -ForegroundColor Yellow
php artisan config:clear | Out-Null
php artisan cache:clear | Out-Null
Write-Host "   Cache cleared!" -ForegroundColor Green
Write-Host ""

# Step 5: Display connection info
Write-Host "[5/5] Server Configuration Complete!" -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  CONNECTION INFORMATION" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Desktop (Laptop):" -ForegroundColor Cyan
Write-Host "   http://localhost:8000" -ForegroundColor White
Write-Host "   OR" -ForegroundColor Gray
Write-Host "   http://$ipAddress:8000" -ForegroundColor White
Write-Host ""
Write-Host "Mobile (Phone):" -ForegroundColor Cyan
Write-Host "   http://$ipAddress:8000" -ForegroundColor Yellow -BackgroundColor DarkBlue
Write-Host ""
Write-Host "Make sure your phone is on the same WiFi!" -ForegroundColor Magenta
Write-Host ""
Write-Host "Hot Reload: ENABLED" -ForegroundColor Green
Write-Host "Changes will appear automatically!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Starting servers..." -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop all servers" -ForegroundColor Red
Write-Host ""

# Start Laravel server in background
$laravelJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    php artisan serve --host=0.0.0.0 --port=8000
}

# Start Scheduler in background
$schedulerJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    powershell -ExecutionPolicy Bypass -File run-scheduler.ps1
}

# Wait for servers to start
Start-Sleep -Seconds 2

# Start Vite in foreground (so we can see output and stop with Ctrl+C)
try {
    npm run dev
} finally {
    # Cleanup: Stop all background servers when Vite stops
    Write-Host ""
    Write-Host "Stopping servers..." -ForegroundColor Yellow
    Stop-Job -Job $laravelJob
    Remove-Job -Job $laravelJob
    Stop-Job -Job $schedulerJob
    Remove-Job -Job $schedulerJob
    
    # Restore original .env
    Write-Host "Restoring original .env..." -ForegroundColor Yellow
    if (Test-Path $envBackup) {
        Copy-Item $envBackup $envPath -Force
        php artisan config:clear | Out-Null
    }
    
    Write-Host "All servers stopped and config restored." -ForegroundColor Green
}
