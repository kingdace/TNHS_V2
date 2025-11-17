<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Announcement;
use App\Models\Notification;
use Carbon\Carbon;

class ProcessScheduledAnnouncements extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'announcements:process-scheduled';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Process scheduled announcements for publishing and unpublishing';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = Carbon::now();
        $publishedCount = 0;
        $unpublishedCount = 0;

        $this->info("Processing scheduled announcements at {$now->format('Y-m-d H:i:s')}");

        // Process items that should be published
        $toPublish = Announcement::shouldBePublished()->get();

        foreach ($toPublish as $announcement) {
            $announcement->update([
                'status' => 'published',
                'published_at' => $now,
                'scheduled_publish_at' => null, // Clear the schedule
            ]);

            // Create notification
            Notification::createNotification(
                'announcement_published',
                'Announcement Published',
                "'{$announcement->title}' has been automatically published",
                ['announcement_id' => $announcement->id]
            );

            $this->info("✅ Published: {$announcement->title}");
            $publishedCount++;
        }

        // Process items that should be unpublished
        $toUnpublish = Announcement::shouldBeUnpublished()->get();

        foreach ($toUnpublish as $announcement) {
            $announcement->update([
                'status' => 'archived',
                'scheduled_unpublish_at' => null, // Clear the schedule
            ]);

            // Create notification
            Notification::createNotification(
                'announcement_expired',
                'Announcement Expired',
                "'{$announcement->title}' has been automatically archived",
                ['announcement_id' => $announcement->id]
            );

            $this->info("🗄️ Archived: {$announcement->title}");
            $unpublishedCount++;
        }

        // Summary
        if ($publishedCount > 0 || $unpublishedCount > 0) {
            $this->info("📊 Summary: {$publishedCount} published, {$unpublishedCount} archived");
        } else {
            $this->info("ℹ️ No scheduled announcements to process at this time");
        }

        return Command::SUCCESS;
    }
}
