<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SchoolSealCoreValue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SchoolSealCoreValueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $coreValues = SchoolSealCoreValue::ordered()->get();
        return response()->json([
            'success' => true,
            'data' => $coreValues
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:100',
            'color' => 'nullable|string|max:50',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'display_order' => 'integer|min:0',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->except('image');
        $data['is_active'] = $request->boolean('is_active');

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $imagePath = $image->storeAs('public/school-seal/values', $imageName);
            $data['image_path'] = Storage::url($imagePath);
        }

        $coreValue = SchoolSealCoreValue::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Core value created successfully',
            'data' => $coreValue
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $coreValue = SchoolSealCoreValue::findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $coreValue
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $coreValue = SchoolSealCoreValue::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:100',
            'color' => 'nullable|string|max:50',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'display_order' => 'integer|min:0',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->except('image');
        $data['is_active'] = $request->boolean('is_active');

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($coreValue->image_path) {
                $oldImagePath = str_replace('/storage/', 'public/', $coreValue->image_path);
                Storage::delete($oldImagePath);
            }

            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $imagePath = $image->storeAs('public/school-seal/values', $imageName);
            $data['image_path'] = Storage::url($imagePath);
        }

        $coreValue->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Core value updated successfully',
            'data' => $coreValue
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $coreValue = SchoolSealCoreValue::findOrFail($id);

        // Delete associated image if exists
        if ($coreValue->image_path) {
            $imagePath = str_replace('/storage/', 'public/', $coreValue->image_path);
            Storage::delete($imagePath);
        }

        $coreValue->delete();

        return response()->json([
            'success' => true,
            'message' => 'Core value deleted successfully'
        ]);
    }

    /**
     * Toggle active status
     */
    public function toggleActive(string $id)
    {
        $coreValue = SchoolSealCoreValue::findOrFail($id);
        $coreValue->update(['is_active' => !$coreValue->is_active]);

        return response()->json([
            'success' => true,
            'message' => 'Status updated successfully',
            'data' => $coreValue
        ]);
    }
}
