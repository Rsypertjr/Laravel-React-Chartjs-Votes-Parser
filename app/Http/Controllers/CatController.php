<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Cat;
class CatController extends Controller
{
    public function index(){
      
        return view('add-cat-form');
    }

    public function store(Request $request){
        $cat = Cat::firstOrNew(
            ['name' => $request->name]
        );
        if($cat->age != null){
            $message = "We already have ".$cat->name. ' who is '.$cat->age.' years old, '.$cat->color.' in color and';
            $cat->sold ? $message .= " is sold.<br>" : $message .= " is Still Available!!<br>";
            return $message;
        }
        else{
            $cat->age = $request->age;
            $cat->color = $request->color;
            $cat->sold = false;
            $cat->save();
            return redirect('add-cat-form')->with('status',"Cat Form Data Has Been inserted");
        }
       

    }
}