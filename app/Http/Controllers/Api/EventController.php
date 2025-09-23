<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * GET /api/events/public?month=YYYY-MM&types=exam,sports&include_past_overlap=1
     * Returns active events overlapping the specified month.
     */
    public function publicByMonth(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'month' => 'required|date_format:Y-m',
            'types' => 'sometimes|string', // comma-separated list
            'include_past_overlap' => 'sometimes|boolean',
        ]);

        $month = Carbon::createFromFormat('Y-m', $validated['month'])->startOfMonth();
        $monthStart = $month->copy()->startOfDay();
        $monthEnd = $month->copy()->endOfMonth()->endOfDay();

        $types = null;
        if (!empty($validated['types'])) {
            $types = array_filter(array_map('trim', explode(',', $validated['types'])));
        }

        $query = Event::query()
            ->active()
            ->when($types, function ($q) use ($types) {
                $q->whereIn('event_type', $types);
            })
            // overlap logic: start <= monthEnd AND (end is null OR end >= monthStart)
            ->where('start_date', '<=', $monthEnd)
            ->where(function ($q) use ($monthStart) {
                $q->whereNull('end_date')->orWhere('end_date', '>=', $monthStart);
            })
            ->ordered();

        $events = $query->get()->map(function (Event $event) {
            return [
                'id' => $event->id,
                'title' => $event->title,
                'description' => $event->description,
                'event_type' => $event->event_type,
                'start_date' => $event->start_date?->toIso8601String(),
                'end_date' => $event->end_date?->toIso8601String(),
                'location' => $event->location,
                'image_path' => $event->image_path,
                'is_active' => (bool) $event->is_active,
                'display_order' => (int) $event->display_order,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $events,
        ]);
    }
}


