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

Route::view('/', 'sea-animals');

Route::get('/votes-table', function () {
    return view('votes-table');
});


Route::get('/sea-animals', function () {
    return view('sea-animals');
});



Route::get('/vote-rows/{state}', [VoteRowController::class, 'vote_rows']);

Route::get('add-cat-form', [CatController::class, 'index']);
Route::post('store-form',[CatController::class, 'store']);

Route::get('all-cats', function(){    
    Cat::chunk(1, function($cats) {
        foreach($cats as $cat) {
        //foreach (Cat::all() as $cat) {
            //echo $cat->name. ' is '.$cat->age.' years old and '.$cat->color.' in color<br>';
            $message = $cat->name. ' is '.$cat->age.' years old and '.$cat->color.' in color';
            $cat->sold ? $message .= " is sold.<br>" : $message .= " is Still Available!!<br>";
            echo $message;
        }
    });
});

Route::get('cat/color/{color}', function($color){
    $cats = Cat::where('color', $color)
                ->orderBy('age')
                ->get();
    
    $allcats = Cat::all();
    $GLOBALS["color"] = $color;

    $rcats = $allcats->reject(function($cat) {
        return $cat->color == $GLOBALS["color"];
    });

    $cats = $cats->fresh();
    //foreach($rcats as $cat)
    foreach($cats as $cat){
            $message = $cat->name. ' is '.$cat->age.' years old and '.$cat->color.' in color';
            $cat->sold ? $message .= " is sold.<br>" : $message .= " is Still Available!!<br>";
            echo $message;

    }
    
});

Route::get('buy-all-cats', function(){
    $notSold = Cat::where('sold', false)->get();
    $nowSold = $notSold->each->update(['sold' => true]);
    foreach($nowSold as $cat){
        $message = $cat->name. ' is '.$cat->age.' years old and '.$cat->color.' in color';
        $cat->sold ? $message .= " is sold.<br>" : $message .= " is Still Available!!<br>";
        echo $message;
    }
});

Route::get('/cat/{id}', function ($id){
    return Cat::findOrFail($id);
});


Route::get('cat/{name}/delete',function($name){

    $cat = Cat::where('name',$name)->first();
    $name = $cat->name;
    $cat->delete();
    return 'Cat '.$name.' is deleted';
});