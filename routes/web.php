<?php

use App\Models\Score;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return view('home');
    })->name('home');

    Route::get('/leaderboard', function () {
        $scores = Score::orderBy('score', 'desc')
            ->orderBy('lives', 'desc')
            ->take(10)
            ->get();

        return view('leaderboard', compact('scores'));
    })->name('leaderboard');

    Route::get('/account', function () {
        return true;
    })->name('account');
});

require __DIR__ . '/auth.php';
