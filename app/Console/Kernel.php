<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Artisan;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->call(function () {
            Artisan::call('announcements:process-scheduled');
        })->everyMinute()->name('process-announcements');

        $schedule->call(function () {
            Artisan::call('events:process-scheduled');
        })->everyMinute()->name('process-events');

        $schedule->call(function () {
            Artisan::call('content:check-expiring');
        })->dailyAt('08:00')->name('check-expiring-content');
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
