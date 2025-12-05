# ============================================
# FINAL MOBILE TESTING SOLUTION
# ============================================
# Simple, reliable, guaranteed to work!
# ============================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Mobile Testing (Production Build)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Get IP
Write-Host "[1/4] Detecting IP address..." -ForegroundColor Yellow
$ipAddress = (Get-NetIPAddress -AddressFamily IPv4 | 
              Where-Object { $_.IPAddress -ne '127.0.0.1' -and $_.PrefixOrigin -eq 'Dhcp' } | 
              Select-Object -First 1).IPAddress

if (-not $ipAddress) {
    $ipAddress = (Get-NetIPAddress -AddressFamily IPv4 | 
                  Where-Object { $_.IPAddress -ne '127.0.0.1' } | 
                  Select-Object -First 1).IPAddress
}

Write-Host "   IP: $ipAddress" -ForegroundColor Green
Write-Host ""

# Step 2: Clear cache
Write-Host "[2/4] Clearing Laravel cache..." -ForegroundColor Yellow
php artisan config:clear | Out-Null
php artisan cache:clear | Out-Null
php artisan view:clear | Out-Null
Write-Host "   Cache cleared" -ForegroundColor Green
Write-Host ""

# Step 3: Build assets
Write-Host "[3/4] Building production assets..." -ForegroundColor Yellow
Write-Host "   This takes ~30 seconds, please wait..." -ForegroundColor Gray
npm run build | Out-Null

if ($LASTEXITCODE -ne 0) {
    Write-Host "   ERROR: Build failed!" -ForegroundColor Red
    pause
    exit 1
}

Write-Host "   Build complete!" -ForegroundColor Green
Write-Host ""

# Step 4: Start server
Write-Host "[4/4] Starting servers..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  CONNECTION INFO" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Desktop:" -ForegroundColor Cyan
Write-Host "   http://localhost:8000" -ForegroundColor White
Write-Host ""
Write-Host "Mobile:" -ForegroundColor Cyan
Write-Host "   http://$ipAddress:8000" -ForegroundColor Yellow -BackgroundColor DarkBlue
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "NOTE: Using production build" -ForegroundColor Yellow
Write-Host "To see changes, stop (Ctrl+C) and run again" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop all servers" -ForegroundColor Red
Write-Host ""

# Start scheduler in background
$schedulerJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    powershell -ExecutionPolicy Bypass -File run-scheduler.ps1
}

# Start Laravel in foreground
try {
    php artisan serve --host=0.0.0.0 --port=8000
} finally {
    Write-Host ""
    Write-Host "Stopping servers..." -ForegroundColor Yellow
    Stop-Job -Job $schedulerJob
    Remove-Job -Job $schedulerJob
    Write-Host "Servers stopped." -ForegroundColor Green
}
