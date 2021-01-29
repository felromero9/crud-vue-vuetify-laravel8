<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;


Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
//Route::get('/crud', [App\Http\Controllers\HomeController::class, 'crud'])->name('crud');


Route::apiResource('/articles', ArticleController::class);
