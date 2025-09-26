<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SchoolSealSymbolicElement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SchoolSealSymbolicElementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $elements = SchoolSealSymbolicElement::ordered()->get();
        return response()->json([
            'success' => true,
            'data' => $elements
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
            'emoji' => 'nullable|string|max:10',
            'meaning' => 'required|string',
            'interpretation' => 'required|string',
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
            $imagePath = $image->storeAs('school-seal/elements', $imageName, 'public');
            $data['image_path'] = '/storage/' . $imagePath;
        }

        $element = SchoolSealSymbolicElement::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Symbolic element created successfully',
            'data' => $element
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $element = SchoolSealSymbolicElement::findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $element
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $element = SchoolSealSymbolicElement::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:100',
            'color' => 'nullable|string|max:50',
            'emoji' => 'nullable|string|max:10',
            'meaning' => 'required|string',
            'interpretation' => 'required|string',
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
            if ($element->image_path) {
                $oldImagePath = str_replace('/storage/', '', $element->image_path);
                Storage::disk('public')->delete($oldImagePath);
            }

            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $imagePath = $image->storeAs('school-seal/elements', $imageName, 'public');
            $data['image_path'] = '/storage/' . $imagePath;
        }

        $element->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Symbolic element updated successfully',
            'data' => $element
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $element = SchoolSealSymbolicElement::findOrFail($id);

        // Delete associated image if exists
        if ($element->image_path) {
            $imagePath = str_replace('/storage/', 'public/', $element->image_path);
            Storage::delete($imagePath);
        }

        $element->delete();

        return response()->json([
            'success' => true,
            'message' => 'Symbolic element deleted successfully'
        ]);
    }

    /**
     * Toggle active status
     */
    public function toggleActive(string $id)
    {
        $element = SchoolSealSymbolicElement::findOrFail($id);
        $element->update(['is_active' => !$element->is_active]);

        return response()->json([
            'success' => true,
            'message' => 'Status updated successfully',
            'data' => $element
        ]);
    }
}
