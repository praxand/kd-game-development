<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/score', function (Request $request) {
    $validated = $request->validate([
        'userId' => 'required|integer|exists:users,id',
        'score' => 'required|integer',
        'lives' => 'required|integer',
    ]);

    $user = User::find($validated['userId']);

    if (!$user) {
        return response()->json([
            'error' => 'User not found',
        ], 404);
    }

    $user->scores()->create([
        'score' => $validated['score'],
        'lives' => $validated['lives'],
    ]);

    return response()->json([
        'message' => 'Score saved successfully',
    ]);
});
