# ============================================
# Mobile Development Server (Production Build)
# ============================================
# This approach builds the assets once and serves them
# No Vite dev server needed - works 100% on mobile!
# ============================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Mobile Dev Server (Production Mode)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Detect IP Address
Write-Host "[1/3] Detecting your IP address..." -ForegroundColor Yellow

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

# Step 2: Build assets
Write-Host "[2/3] Building production assets..." -ForegroundColor Yellow
Write-Host "   This may take a minute..." -ForegroundColor Gray

npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Build failed!" -ForegroundColor Red
    pause
    exit 1
}

Write-Host "   Build complete!" -ForegroundColor Green
Write-Host ""

# Step 3: Display connection info
Write-Host "[3/3] Starting Laravel server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  CONNECTION INFORMATION" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Desktop (Laptop):" -ForegroundColor Cyan
Write-Host "   http://localhost:8000" -ForegroundColor White
Write-Host ""
Write-Host "Mobile (Phone):" -ForegroundColor Cyan
Write-Host "   http://$ipAddress:8000" -ForegroundColor Yellow -BackgroundColor DarkBlue
Write-Host ""
Write-Host "Make sure your phone is on the same WiFi!" -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "NOTE: Using production build - no hot reload" -ForegroundColor Yellow
Write-Host "To see changes, stop server and run this script again" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop server" -ForegroundColor Red
Write-Host ""

# Start Laravel server with scheduler
$schedulerJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    powershell -ExecutionPolicy Bypass -File run-scheduler.ps1
}

# Start Laravel in foreground
try {
    php artisan serve --host=0.0.0.0 --port=8000
} finally {
    Write-Host ""
    Write-Host "Stopping scheduler..." -ForegroundColor Yellow
    Stop-Job -Job $schedulerJob
    Remove-Job -Job $schedulerJob
    Write-Host "Server stopped." -ForegroundColor Green
}
