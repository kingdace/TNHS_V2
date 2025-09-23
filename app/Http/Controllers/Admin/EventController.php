<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'month' => 'sometimes|date_format:Y-m',
            'types' => 'sometimes|string',
            'active' => 'sometimes|boolean',
            'search' => 'sometimes|string',
        ]);

        $query = Event::query();

        if ($request->filled('month')) {
            $month = \Carbon\Carbon::createFromFormat('Y-m', $request->get('month'))->startOfMonth();
            $monthStart = $month->copy()->startOfDay();
            $monthEnd = $month->copy()->endOfMonth()->endOfDay();
            $query->where('start_date', '<=', $monthEnd)
                ->where(function ($q) use ($monthStart) {
                    $q->whereNull('end_date')->orWhere('end_date', '>=', $monthStart);
                });
        }

        if ($request->filled('types')) {
            $types = array_filter(array_map('trim', explode(',', $request->get('types'))));
            $query->whereIn('event_type', $types);
        }

        if ($request->has('active')) {
            $query->where('is_active', (bool) $request->boolean('active'));
        }

        if ($request->filled('search')) {
            $s = $request->get('search');
            $query->where(function ($q) use ($s) {
                $q->where('title', 'like', "%$s%")->orWhere('description', 'like', "%$s%")
                  ->orWhere('location', 'like', "%$s%");
            });
        }

        $events = $query->ordered()->get();

        return response()->json(['success' => true, 'data' => $events]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'event_type' => 'required|in:academic,sports,cultural,meeting,exam',
            'start_date' => 'required|date',
            'end_date' => 'sometimes|nullable|date|after_or_equal:start_date',
            'location' => 'sometimes|nullable|string|max:255',
            'image' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,gif,webp|max:4096',
            'is_active' => 'sometimes|boolean',
            'display_order' => 'sometimes|integer',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('events', 'public');
        }

        $event = Event::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'event_type' => $validated['event_type'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'] ?? null,
            'location' => $validated['location'] ?? null,
            'image_path' => $imagePath,
            'is_active' => (bool) ($request->boolean('is_active', true)),
            'display_order' => (int) ($validated['display_order'] ?? 0),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Event created successfully',
            'data' => $event,
        ], 201);
    }

    public function show(Event $event): JsonResponse
    {
        return response()->json(['success' => true, 'data' => $event]);
    }

    public function update(Request $request, Event $event): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|nullable|string|max:255',
            'description' => 'sometimes|nullable|string',
            'event_type' => 'sometimes|in:academic,sports,cultural,meeting,exam',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|nullable|date|after_or_equal:start_date',
            'location' => 'sometimes|nullable|string|max:255',
            'image' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,gif,webp|max:4096',
            'is_active' => 'sometimes|boolean',
            'display_order' => 'sometimes|integer',
        ]);

        $data = [];
        foreach (['title','description','event_type','start_date','end_date','location','is_active','display_order'] as $field) {
            if ($request->has($field)) {
                if ($field === 'is_active') {
                    $data[$field] = (bool) $request->boolean('is_active');
                } else {
                    $data[$field] = $validated[$field] ?? null;
                }
            }
        }

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('events', 'public');
        }

        $event->update($data);

        return response()->json(['success' => true, 'message' => 'Event updated successfully', 'data' => $event]);
    }

    public function destroy(Event $event): JsonResponse
    {
        $event->delete();
        return response()->json(['success' => true, 'message' => 'Event deleted successfully']);
    }
}


