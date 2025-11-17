<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Announcement;
use App\Models\Event;
use App\Models\Notification;
use Carbon\Carbon;

class CheckExpiringContent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'content:check-expiring';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check for content that will expire soon and create notifications';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = Carbon::now();
        $tomorrow = $now->copy()->addDay();
        $notificationCount = 0;

        $this->info("Checking for expiring content at {$now->format('Y-m-d H:i:s')}");

        // Check announcements expiring within 24 hours
        $expiringAnnouncements = Announcement::where('status', 'published')
                                           ->whereNotNull('scheduled_unpublish_at')
                                           ->where('scheduled_unpublish_at', '>', $now)
                                           ->where('scheduled_unpublish_at', '<=', $tomorrow)
                                           ->get();

        foreach ($expiringAnnouncements as $announcement) {
            // Check if we already sent this notification
            $existingNotification = Notification::where('type', 'announcement_expiring_soon')
                                               ->where('data->announcement_id', $announcement->id)
                                               ->where('created_at', '>=', $now->copy()->subHours(12))
                                               ->exists();

            if (!$existingNotification) {
                Notification::createNotification(
                    'announcement_expiring_soon',
                    'Announcement Expiring Soon',
                    "'{$announcement->title}' will expire on {$announcement->scheduled_unpublish_at->format('M j, Y \a\t g:i A')}",
                    ['announcement_id' => $announcement->id]
                );

                $this->info("⚠️ Expiring soon: {$announcement->title}");
                $notificationCount++;
            }
        }

        // Check events ending within 24 hours
        $endingEvents = Event::where('is_active', true)
                            ->where('end_date', '>', $now)
                            ->where('end_date', '<=', $tomorrow)
                            ->get();

        foreach ($endingEvents as $event) {
            // Check if we already sent this notification
            $existingNotification = Notification::where('type', 'event_ending_soon')
                                               ->where('data->event_id', $event->id)
                                               ->where('created_at', '>=', $now->copy()->subHours(12))
                                               ->exists();

            if (!$existingNotification) {
                Notification::createNotification(
                    'event_ending_soon',
                    'Event Ending Soon',
                    "'{$event->title}' will end on {$event->end_date->format('M j, Y \a\t g:i A')}",
                    ['event_id' => $event->id]
                );

                $this->info("⚠️ Event ending soon: {$event->title}");
                $notificationCount++;
            }
        }

        // Summary
        if ($notificationCount > 0) {
            $this->info("📊 Created {$notificationCount} expiration notifications");
        } else {
            $this->info("ℹ️ No content expiring within 24 hours");
        }

        return Command::SUCCESS;
    }
}
