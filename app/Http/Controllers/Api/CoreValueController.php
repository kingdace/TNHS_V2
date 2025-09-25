<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CoreValue;
use Illuminate\Http\Request;

class CoreValueController extends Controller
{
    /**
     * Get public core values
     */
    public function public()
    {
        try {
            $coreValues = CoreValue::active()
                ->ordered()
                ->get();

            return response()->json([
                'success' => true,
                'data' => $coreValues,
                'message' => 'Core values retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve core values',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
