<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MountainController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (only accessible to authenticated users)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/mountains', [MountainController::class, 'index']);          
    Route::post('/mountains', [MountainController::class, 'store']);         
    Route::get('/mountains/{mountain}', [MountainController::class, 'show']); 
    Route::put('/mountains/{mountain}', [MountainController::class, 'update']); 
    Route::patch('/mountains/{mountain}', [MountainController::class, 'update']); 
    Route::delete('/mountains/{mountain}', [MountainController::class, 'destroy']); 
});
