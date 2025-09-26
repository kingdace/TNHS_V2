<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\QualityPolicy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QualityPolicyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $policies = QualityPolicy::orderBy('created_at', 'desc')->get();
        return response()->json([
            'success' => true,
            'data' => $policies
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'intro_statement' => 'required|string',
            'concluding_statement' => 'required|string',
            'key_points' => 'required|array|min:1',
            'key_points.*' => 'required|string',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->all();
        $data['is_active'] = $request->boolean('is_active');

        $policy = QualityPolicy::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Quality policy created successfully',
            'data' => $policy
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $policy = QualityPolicy::findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $policy
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $policy = QualityPolicy::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'intro_statement' => 'required|string',
            'concluding_statement' => 'required|string',
            'key_points' => 'required|array|min:1',
            'key_points.*' => 'required|string',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->all();
        $data['is_active'] = $request->boolean('is_active');

        $policy->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Quality policy updated successfully',
            'data' => $policy
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $policy = QualityPolicy::findOrFail($id);
        $policy->delete();

        return response()->json([
            'success' => true,
            'message' => 'Quality policy deleted successfully'
        ]);
    }

    /**
     * Toggle active status
     */
    public function toggleActive(string $id)
    {
        $policy = QualityPolicy::findOrFail($id);
        $policy->update(['is_active' => !$policy->is_active]);

        return response()->json([
            'success' => true,
            'message' => 'Status updated successfully',
            'data' => $policy
        ]);
    }
}
