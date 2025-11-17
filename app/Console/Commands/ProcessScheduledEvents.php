<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Event;
use App\Models\Notification;
use Carbon\Carbon;

class ProcessScheduledEvents extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'events:process-scheduled';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Process scheduled events and check for expired events';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = Carbon::now();
        $expiredCount = 0;

        $this->info("Processing scheduled events at {$now->format('Y-m-d H:i:s')}");

        // Find events that have ended and should be marked as inactive
        $expiredEvents = Event::where('is_active', true)
                             ->where('end_date', '<', $now)
                             ->get();

        foreach ($expiredEvents as $event) {
            $event->update(['is_active' => false]);

            // Create notification
            Notification::createNotification(
                'event_expired',
                'Event Expired',
                "'{$event->title}' has ended and been marked as inactive",
                ['event_id' => $event->id]
            );

            $this->info("🗄️ Expired: {$event->title}");
            $expiredCount++;
        }

        // Check for events starting soon (within next 24 hours)
        $upcomingEvents = Event::where('is_active', true)
                              ->where('start_date', '>', $now)
                              ->where('start_date', '<=', $now->copy()->addDay())
                              ->get();

        foreach ($upcomingEvents as $event) {
            // Check if we already created this notification
            $existingNotification = Notification::where('type', 'event_starting_soon')
                                               ->where('data->event_id', $event->id)
                                               ->where('created_at', '>=', $now->copy()->subHours(12))
                                               ->exists();

            if (!$existingNotification) {
                Notification::createNotification(
                    'event_starting_soon',
                    'Event Starting Soon',
                    "'{$event->title}' starts on {$event->start_date->format('M j, Y \a\t g:i A')}",
                    ['event_id' => $event->id]
                );

                $this->info("⏰ Upcoming: {$event->title}");
            }
        }

        // Summary
        if ($expiredCount > 0) {
            $this->info("📊 Summary: {$expiredCount} events expired");
        } else {
            $this->info("ℹ️ No events to process at this time");
        }

        return Command::SUCCESS;
    }
}
