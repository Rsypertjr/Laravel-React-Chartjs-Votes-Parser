<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CatController;

use App\Http\Controllers\VoteRowController;
use App\Models\Cat;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/votes-table', function () {
    return view('votes-table');
});

Route::get('/work-portfolio', function () {
    return view('work-portfolio');
});

Route::get('/vote-rows/{state}', [VoteRowController::class, 'vote_rows']);
