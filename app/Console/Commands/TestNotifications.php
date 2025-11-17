<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Notification;

class TestNotifications extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:notifications';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create test notifications to verify the system works';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Creating test notifications...');

        // Create different types of test notifications
        $notifications = [
            [
                'type' => 'announcement_published',
                'title' => 'Test: Announcement Published',
                'message' => 'A test announcement has been automatically published',
                'data' => ['announcement_id' => 999, 'test' => true]
            ],
            [
                'type' => 'announcement_expired',
                'title' => 'Test: Announcement Expired',
                'message' => 'A test announcement has been automatically archived',
                'data' => ['announcement_id' => 998, 'test' => true]
            ],
            [
                'type' => 'event_starting_soon',
                'title' => 'Test: Event Starting Soon',
                'message' => 'A test event will start in 2 hours',
                'data' => ['event_id' => 997, 'test' => true]
            ],
            [
                'type' => 'announcement_expiring_soon',
                'title' => 'Test: Content Expiring Soon',
                'message' => 'A test announcement will expire in 6 hours',
                'data' => ['announcement_id' => 996, 'test' => true]
            ]
        ];

        foreach ($notifications as $notificationData) {
            Notification::createNotification(
                $notificationData['type'],
                $notificationData['title'],
                $notificationData['message'],
                $notificationData['data']
            );

            $this->info("✅ Created: {$notificationData['title']}");
        }

        $this->info('🎉 Test notifications created successfully!');
        $this->info('💡 Check the notification bell in the admin header to see them.');

        return Command::SUCCESS;
    }
}
