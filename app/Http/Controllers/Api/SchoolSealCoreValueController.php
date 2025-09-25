<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SchoolSealCoreValue;
use Illuminate\Http\Request;

class SchoolSealCoreValueController extends Controller
{
    /**
     * Get public core values
     */
    public function public()
    {
        $coreValues = SchoolSealCoreValue::active()->ordered()->get();

        return response()->json([
            'success' => true,
            'data' => $coreValues
        ]);
    }
}
