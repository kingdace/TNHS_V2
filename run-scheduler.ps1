Write-Host "Starting announcement scheduler..." -ForegroundColor Green

while ($true) {
    Write-Host "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - Processing scheduled announcements..." -ForegroundColor Yellow

    try {
        & php artisan announcements:process-scheduled
        Write-Host "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - Command executed successfully" -ForegroundColor Green
    }
    catch {
        Write-Host "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - Error: $_" -ForegroundColor Red
    }

    Start-Sleep -Seconds 10
}
