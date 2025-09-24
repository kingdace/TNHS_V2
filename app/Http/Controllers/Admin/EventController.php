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
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'sometimes|nullable|string',
                'excerpt' => 'sometimes|nullable|string|max:500',
                'event_type' => 'required|in:academic,sports,cultural,meeting,exam',
                'start_date' => 'required|string',
                'end_date' => 'sometimes|nullable|string',
                'location' => 'sometimes|nullable|string|max:255',
                'image' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,gif,webp|max:4096',
                'is_featured' => 'sometimes|boolean',
                'is_public' => 'sometimes|boolean',
                'slug' => 'sometimes|nullable|string|max:255|unique:events,slug',
                'is_active' => 'sometimes|boolean',
                'display_order' => 'sometimes|integer',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('events', 'public');
        }

        $event = Event::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'excerpt' => $validated['excerpt'] ?? null,
            'event_type' => $validated['event_type'],
            'start_date' => $validated['start_date'] ? \Carbon\Carbon::parse($validated['start_date'], config('app.timezone')) : null,
            'end_date' => $validated['end_date'] ? \Carbon\Carbon::parse($validated['end_date'], config('app.timezone')) : null,
            'location' => $validated['location'] ?? null,
            'image_path' => $imagePath,
            'is_featured' => (bool) ($request->boolean('is_featured', false)),
            'is_public' => (bool) ($request->boolean('is_public', true)),
            'slug' => $validated['slug'] ?? null,
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
            'excerpt' => 'sometimes|nullable|string|max:500',
            'event_type' => 'sometimes|in:academic,sports,cultural,meeting,exam',
            'start_date' => 'sometimes|string',
            'end_date' => 'sometimes|nullable|string',
            'location' => 'sometimes|nullable|string|max:255',
            'image' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,gif,webp|max:4096',
            'is_featured' => 'sometimes|boolean',
            'is_public' => 'sometimes|boolean',
            'slug' => 'sometimes|nullable|string|max:255|unique:events,slug,' . $event->id,
            'is_active' => 'sometimes|boolean',
            'display_order' => 'sometimes|integer',
        ]);

        $data = [];
        foreach (['title','description','excerpt','event_type','start_date','end_date','location','is_featured','is_public','slug','is_active','display_order'] as $field) {
            if ($request->has($field)) {
                if (in_array($field, ['is_active', 'is_featured', 'is_public'])) {
                    $data[$field] = (bool) $request->boolean($field);
                } elseif ($field === 'start_date') {
                    $data[$field] = $validated[$field] ? \Carbon\Carbon::parse($validated[$field], config('app.timezone')) : null;
                } elseif ($field === 'end_date') {
                    $data[$field] = $validated[$field] ? \Carbon\Carbon::parse($validated[$field], config('app.timezone')) : null;
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
