<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactInfo;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class ContactInfoController extends Controller
{
    /**
     * Display a listing of contact information.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = ContactInfo::query();

            // Apply filters
            if ($request->has('type') && $request->type) {
                $query->byType($request->type);
            }

            if ($request->has('active') && $request->active !== null) {
                $query->where('is_active', $request->boolean('active'));
            }

            // Apply ordering
            $query->ordered();

            $contactInfo = $query->get();

            return response()->json([
                'success' => true,
                'data' => $contactInfo,
                'message' => 'Contact information retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve contact information',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created contact information.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'contact_type' => 'required|string|max:100',
                'title' => 'nullable|string|max:255',
                'value' => 'required|string|max:500',
                'icon' => 'nullable|string|max:100',
                'display_order' => 'integer|min:0',
                'is_active' => 'boolean',
            ]);

            $contactInfo = ContactInfo::create($validated);

            return response()->json([
                'success' => true,
                'data' => $contactInfo,
                'message' => 'Contact information created successfully'
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create contact information',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified contact information.
     */
    public function show(ContactInfo $contactInfo): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'data' => $contactInfo,
                'message' => 'Contact information retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve contact information',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified contact information.
     */
    public function update(Request $request, ContactInfo $contactInfo): JsonResponse
    {
        try {
            $validated = $request->validate([
                'contact_type' => 'sometimes|string|max:100',
                'title' => 'nullable|string|max:255',
                'value' => 'sometimes|string|max:500',
                'icon' => 'nullable|string|max:100',
                'display_order' => 'integer|min:0',
                'is_active' => 'boolean',
            ]);

            $contactInfo->update($validated);

            return response()->json([
                'success' => true,
                'data' => $contactInfo,
                'message' => 'Contact information updated successfully'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update contact information',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified contact information.
     */
    public function destroy(ContactInfo $contactInfo): JsonResponse
    {
        try {
            $contactInfo->delete();

            return response()->json([
                'success' => true,
                'message' => 'Contact information deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete contact information',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle active status of contact information.
     */
    public function toggleActive(ContactInfo $contactInfo): JsonResponse
    {
        try {
            $contactInfo->update(['is_active' => !$contactInfo->is_active]);

            return response()->json([
                'success' => true,
                'data' => $contactInfo,
                'message' => 'Contact information status updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update contact information status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Reorder contact information.
     */
    public function reorder(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'info' => 'required|array',
                'info.*.id' => 'required|exists:contact_info,id',
                'info.*.display_order' => 'required|integer|min:0',
            ]);

            foreach ($validated['info'] as $infoData) {
                ContactInfo::where('id', $infoData['id'])
                    ->update(['display_order' => $infoData['display_order']]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Contact information reordered successfully'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to reorder contact information',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
