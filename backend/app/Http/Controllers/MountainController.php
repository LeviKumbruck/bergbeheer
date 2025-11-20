<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mountain;

class MountainController extends Controller
{
    /**
     * GET /api/mountains
     * Show all mountains
     */
    public function index()
    {
        $mountains = Mountain::orderBy('name')->get();
        return response()->json($mountains);
    }

    /**
     * POST /api/mountains
     * Create a new mountain
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => ['required', 'string', 'max:255'],
            'location'    => ['required', 'string', 'max:255'],
            'height'      => ['required', 'integer', 'min:0'],
            'description' => ['nullable', 'string'],
        ]);

        $mountain = Mountain::create($data);

        return response()->json($mountain, 201);
    }

    /**
     * GET /api/mountains/{mountain}
     * Show details of a single mountain
     */
    public function show(Mountain $mountain)
    {
        return response()->json($mountain);
    }

    /**
     * PUT/PATCH /api/mountains/{mountain}
     * Update an existing mountain
     */
    public function update(Request $request, Mountain $mountain)
    {
        $data = $request->validate([
            'name'        => ['sometimes', 'required', 'string', 'max:255'],
            'location'    => ['sometimes', 'required', 'string', 'max:255'],
            'height'      => ['sometimes', 'required', 'integer', 'min:0'],
            'description' => ['nullable', 'string'],
        ]);

        $mountain->update($data);

        return response()->json($mountain);
    }

    /**
     * DELETE /api/mountains/{mountain}
     * Delete a mountain
     */
    public function destroy(Mountain $mountain)
    {
        $mountain->delete();

        return response()->json([
            'message' => 'Mountain deleted successfully'
        ], 200);
    }
}
