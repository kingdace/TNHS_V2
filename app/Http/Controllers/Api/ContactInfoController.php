<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactInfo;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ContactInfoController extends Controller
{
    /**
     * Display a listing of active contact information.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = ContactInfo::active()->ordered();

            // Filter by contact type if specified
            if ($request->has('type')) {
                $query->byType($request->type);
            }

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
     * Display the specified contact information.
     */
    public function show(ContactInfo $contactInfo): JsonResponse
    {
        try {
            if (!$contactInfo->is_active) {
                return response()->json([
                    'success' => false,
                    'message' => 'Contact information not found'
                ], 404);
            }

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
     * Get contact information by type.
     */
    public function byType(string $type): JsonResponse
    {
        try {
            $contactInfo = ContactInfo::active()
                ->byType($type)
                ->ordered()
                ->get();

            return response()->json([
                'success' => true,
                'data' => $contactInfo,
                'message' => "Contact information for type '{$type}' retrieved successfully"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve contact information by type',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get specific contact information types.
     */
    public function emails(): JsonResponse
    {
        return $this->byType('email');
    }

    public function phones(): JsonResponse
    {
        return $this->byType('phone');
    }

    public function addresses(): JsonResponse
    {
        return $this->byType('address');
    }

    public function hours(): JsonResponse
    {
        return $this->byType('hours');
    }
}
