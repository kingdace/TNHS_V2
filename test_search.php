<?php

// Simple test to check what's causing the search error
require_once 'vendor/autoload.php';

use App\Models\Announcement;
use App\Models\Event;
use App\Models\StaffProfile;
use App\Models\AcademicProgram;

echo "Testing models...\n";

try {
    echo "Testing Announcement model...\n";
    $announcements = Announcement::where('status', 'published')->limit(1)->get();
    echo "Announcements: " . $announcements->count() . "\n";
} catch (Exception $e) {
    echo "Announcement error: " . $e->getMessage() . "\n";
}

try {
    echo "Testing Event model...\n";
    $events = Event::where('status', 'published')->limit(1)->get();
    echo "Events: " . $events->count() . "\n";
} catch (Exception $e) {
    echo "Event error: " . $e->getMessage() . "\n";
}

try {
    echo "Testing StaffProfile model...\n";
    $staff = StaffProfile::where('is_active', true)->limit(1)->get();
    echo "Staff: " . $staff->count() . "\n";
} catch (Exception $e) {
    echo "Staff error: " . $e->getMessage() . "\n";
}

try {
    echo "Testing AcademicProgram model...\n";
    $programs = AcademicProgram::where('is_active', true)->limit(1)->get();
    echo "Programs: " . $programs->count() . "\n";
} catch (Exception $e) {
    echo "Program error: " . $e->getMessage() . "\n";
}

echo "Test complete.\n";
