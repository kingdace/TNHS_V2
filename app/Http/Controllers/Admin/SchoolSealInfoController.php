<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SchoolSealInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SchoolSealInfoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sealInfo = SchoolSealInfo::ordered()->get();
        return response()->json([
            'success' => true,
            'data' => $sealInfo
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'info_type' => 'required|string|max:100',
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'subtitle' => 'nullable|string|max:255',
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
            $imagePath = $image->storeAs('public/school-seal', $imageName);
            $data['image_path'] = Storage::url($imagePath);
        }

        $sealInfo = SchoolSealInfo::create($data);

        return response()->json([
            'success' => true,
            'message' => 'School seal info created successfully',
            'data' => $sealInfo
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $sealInfo = SchoolSealInfo::findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $sealInfo
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $sealInfo = SchoolSealInfo::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'info_type' => 'required|string|max:100',
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'subtitle' => 'nullable|string|max:255',
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
            if ($sealInfo->image_path) {
                $oldImagePath = str_replace('/storage/', 'public/', $sealInfo->image_path);
                Storage::delete($oldImagePath);
            }

            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $imagePath = $image->storeAs('public/school-seal', $imageName);
            $data['image_path'] = Storage::url($imagePath);
        }

        $sealInfo->update($data);

        return response()->json([
            'success' => true,
            'message' => 'School seal info updated successfully',
            'data' => $sealInfo
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $sealInfo = SchoolSealInfo::findOrFail($id);

        // Delete associated image if exists
        if ($sealInfo->image_path) {
            $imagePath = str_replace('/storage/', 'public/', $sealInfo->image_path);
            Storage::delete($imagePath);
        }

        $sealInfo->delete();

        return response()->json([
            'success' => true,
            'message' => 'School seal info deleted successfully'
        ]);
    }

    /**
     * Toggle active status
     */
    public function toggleActive(string $id)
    {
        $sealInfo = SchoolSealInfo::findOrFail($id);
        $sealInfo->update(['is_active' => !$sealInfo->is_active]);

        return response()->json([
            'success' => true,
            'message' => 'Status updated successfully',
            'data' => $sealInfo
        ]);
    }
}
