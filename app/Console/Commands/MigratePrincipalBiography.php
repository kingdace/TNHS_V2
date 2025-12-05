<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class MigratePrincipalBiography extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'principal:migrate-biography';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate principal biography from plain text to structured JSON format';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting principal biography migration...');

        // Get the current biography
        $biography = DB::table('principal_corner')
            ->where('content_type', 'biography')
            ->first();

        if (!$biography) {
            $this->warn('No biography found in database.');
            return 0;
        }

        $this->info('Found biography: ' . $biography->title);
        $this->line('Current content preview:');
        $this->line(substr($biography->content, 0, 200) . '...');

        // Check if already structured
        $decoded = json_decode($biography->content, true);
        if ($decoded && isset($decoded['type']) && $decoded['type'] === 'structured') {
            $this->warn('Biography is already in structured format!');
            return 0;
        }

        // Parse the plain text content into structured work experience
        $workExperience = $this->parseWorkExperience($biography->content);

        if (empty($workExperience)) {
            $this->error('Could not parse work experience from content.');
            $this->line('Content:');
            $this->line($biography->content);
            return 1;
        }

        $this->info('Parsed ' . count($workExperience) . ' work experience entries:');
        foreach ($workExperience as $index => $exp) {
            $this->line(($index + 1) . ". {$exp['from_date']} - {$exp['to_date']}: {$exp['position']} ({$exp['status']})");
        }

        // Create structured JSON
        $structuredContent = json_encode([
            'type' => 'structured',
            'sections' => [
                'work_experience' => $workExperience
            ]
        ]);

        // Ask for confirmation
        if (!$this->confirm('Do you want to update the biography with this structured data?', true)) {
            $this->info('Migration cancelled.');
            return 0;
        }

        // Update the database
        DB::table('principal_corner')
            ->where('id', $biography->id)
            ->update([
                'content' => $structuredContent,
                'updated_at' => now()
            ]);

        $this->info('✅ Biography successfully migrated to structured format!');
        $this->info('You can now edit it in the admin panel with the new structured form.');

        return 0;
    }

    /**
     * Parse plain text work experience into structured array
     */
    private function parseWorkExperience($content)
    {
        $workExperience = [];
        
        // Split by lines
        $lines = explode("\n", $content);
        
        foreach ($lines as $line) {
            $line = trim($line);
            
            // Skip empty lines and headers
            if (empty($line) || 
                stripos($line, 'WORK EXPERIENCE') !== false || 
                stripos($line, 'Inclusive Dates') !== false ||
                stripos($line, 'FROM - TO') !== false) {
                continue;
            }

            // Try to parse line format: "MM/DD/YYYY - MM/DD/YYYY - Position - Status"
            // or "MM/DD/YYYY - Present - Position - Status"
            if (preg_match('/^(\d{1,2}\/\d{1,2}\/\d{4})\s*-\s*(.+?)\s*-\s*(.+?)\s*-\s*-?\s*(.+)$/i', $line, $matches)) {
                $workExperience[] = [
                    'from_date' => trim($matches[1]),
                    'to_date' => trim($matches[2]),
                    'position' => trim($matches[3]),
                    'status' => trim($matches[4])
                ];
            }
            // Alternative format without double dash
            elseif (preg_match('/^(\d{1,2}\/\d{1,2}\/\d{4})\s*-\s*(.+?)\s*-\s*(.+?)\s*-\s*(.+)$/i', $line, $matches)) {
                $workExperience[] = [
                    'from_date' => trim($matches[1]),
                    'to_date' => trim($matches[2]),
                    'position' => trim($matches[3]),
                    'status' => trim($matches[4])
                ];
            }
        }

        return $workExperience;
    }
}
