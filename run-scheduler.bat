@echo off
echo Starting announcement scheduler...
:loop
php artisan announcements:process-scheduled
timeout /t 10 /nobreak >nul
goto loop
