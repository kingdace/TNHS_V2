<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SchoolSealSymbolicElement;
use Illuminate\Http\Request;

class SchoolSealSymbolicElementController extends Controller
{
    /**
     * Get public symbolic elements
     */
    public function public()
    {
        $elements = SchoolSealSymbolicElement::active()->ordered()->get();

        return response()->json([
            'success' => true,
            'data' => $elements
        ]);
    }
}
