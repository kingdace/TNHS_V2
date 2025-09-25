<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SchoolSealInfo;
use Illuminate\Http\Request;

class SchoolSealInfoController extends Controller
{
    /**
     * Get public school seal info
     */
    public function public()
    {
        $sealInfo = SchoolSealInfo::active()->ordered()->get();

        return response()->json([
            'success' => true,
            'data' => $sealInfo
        ]);
    }

    /**
     * Get school seal info by type
     */
    public function getByType(Request $request, $type)
    {
        $sealInfo = SchoolSealInfo::active()
            ->byType($type)
            ->ordered()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $sealInfo
        ]);
    }
}
