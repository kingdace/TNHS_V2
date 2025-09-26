<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PrivacyPolicy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PrivacyPolicyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $policies = PrivacyPolicy::orderBy('created_at', 'desc')->get();
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
            'introduction' => 'required|string',
            'information_collected' => 'required|array|min:1',
            'information_collected.*' => 'required|string',
            'how_we_use' => 'required|array|min:1',
            'how_we_use.*' => 'required|string',
            'data_protection' => 'required|array|min:1',
            'data_protection.*' => 'required|string',
            'your_rights' => 'required|array|min:1',
            'your_rights.*' => 'required|string',
            'policy_updates' => 'required|string',
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

        $policy = PrivacyPolicy::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Privacy policy created successfully',
            'data' => $policy
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $policy = PrivacyPolicy::findOrFail($id);
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
        $policy = PrivacyPolicy::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'introduction' => 'required|string',
            'information_collected' => 'required|array|min:1',
            'information_collected.*' => 'required|string',
            'how_we_use' => 'required|array|min:1',
            'how_we_use.*' => 'required|string',
            'data_protection' => 'required|array|min:1',
            'data_protection.*' => 'required|string',
            'your_rights' => 'required|array|min:1',
            'your_rights.*' => 'required|string',
            'policy_updates' => 'required|string',
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
            'message' => 'Privacy policy updated successfully',
            'data' => $policy
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $policy = PrivacyPolicy::findOrFail($id);
        $policy->delete();

        return response()->json([
            'success' => true,
            'message' => 'Privacy policy deleted successfully'
        ]);
    }

    /**
     * Toggle active status
     */
    public function toggleActive(string $id)
    {
        $policy = PrivacyPolicy::findOrFail($id);
        $policy->update(['is_active' => !$policy->is_active]);

        return response()->json([
            'success' => true,
            'message' => 'Status updated successfully',
            'data' => $policy
        ]);
    }
}
