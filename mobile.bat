@echo off
echo ========================================
echo   MOBILE TESTING - PRODUCTION BUILD
echo ========================================
echo.

REM Get IP
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
    set IP=%%a
    goto :found
)
:found
set IP=%IP:~1%
echo Detected IP: %IP%
echo.

REM Clear cache
echo Clearing cache...
call php artisan optimize:clear >nul 2>&1
call php artisan config:clear >nul 2>&1
call php artisan cache:clear >nul 2>&1
call php artisan view:clear >nul 2>&1
echo Cache cleared!
echo.

REM Build
echo Building production assets (30 seconds)...
call npm run build
echo Build complete!
echo.

REM Show URL
echo ========================================
echo   OPEN THIS ON YOUR PHONE:
echo ========================================
echo.
echo   http://%IP%:8000
echo.
echo ========================================
echo.
echo Press Ctrl+C to stop server
echo.

REM Start server
php artisan serve --host=0.0.0.0 --port=8000
