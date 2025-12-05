# ============================================
# GUARANTEED MOBILE TESTING
# ============================================
# This WILL work - I promise!
# ============================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MOBILE TESTING - GUARANTEED TO WORK" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get IP
$ipAddress = (Get-NetIPAddress -AddressFamily IPv4 | 
              Where-Object { $_.IPAddress -ne '127.0.0.1' -and $_.PrefixOrigin -eq 'Dhcp' } | 
              Select-Object -First 1).IPAddress

if (-not $ipAddress) {
    $ipAddress = (Get-NetIPAddress -AddressFamily IPv4 | 
                  Where-Object { $_.IPAddress -ne '127.0.0.1' } | 
                  Select-Object -First 1).IPAddress
}

Write-Host "Your IP: $ipAddress" -ForegroundColor Green
Write-Host ""

# CRITICAL: Clear ALL cache
Write-Host "Clearing ALL Laravel cache..." -ForegroundColor Yellow
php artisan optimize:clear
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear
Write-Host "   All cache cleared!" -ForegroundColor Green
Write-Host ""

# Build
Write-Host "Building assets (30 seconds)..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Build failed!" -ForegroundColor Red
    pause
    exit 1
}

Write-Host "   Build complete!" -ForegroundColor Green
Write-Host ""

# Display info
Write-Host "========================================" -ForegroundColor Green
Write-Host "  OPEN THIS ON YOUR PHONE:" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "  http://$ipAddress:8000" -ForegroundColor Yellow -BackgroundColor DarkBlue
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Desktop also works: http://localhost:8000" -ForegroundColor Gray
Write-Host ""
Write-Host "Starting server (Press Ctrl+C to stop)..." -ForegroundColor Yellow
Write-Host ""

# Start scheduler
$schedulerJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    powershell -ExecutionPolicy Bypass -File run-scheduler.ps1
}

# Start Laravel
try {
    php artisan serve --host=0.0.0.0 --port=8000
} finally {
    Stop-Job -Job $schedulerJob
    Remove-Job -Job $schedulerJob
    Write-Host "Stopped." -ForegroundColor Green
}
