<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/register/pos', function () {
        return Inertia::render('RegisterPOS/RegisterPOS');
    })->name('registerPOS.register');
    Route::get('/register/pos-waiting', function () {
        return Inertia::render('RegisterPOS/WaitingPOS');
    })->name('registerPOS.waiting');
    Route::get('/admin/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');
    Route::get('/admin/cashier', function () {
        return Inertia::render('Admin/Cashier');
    })->name('cashier');
    Route::get('/admin/history', function () {
        return Inertia::render('Admin/History');
    })->name('history');
    Route::get('/admin/settings', function () {
        return Inertia::render('Admin/Settings');
    })->name('settings');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/register-pos', [RoomController::class, 'store'])->name('registerPOS.store');

    Route::get('/admin/store', [ProductController::class, 'getDataByRoom'])->name('store');
    Route::delete('/admin/store/category/delete/{id}', [CategoryController::class, 'deleteCategory'])->name('category.delete');
    Route::post('/admin/store/category/add', [CategoryController::class, 'addCategory'])->name('category.add');
    Route::put('/admin/store/category/update/{id}', [CategoryController::class, 'updateCategory'])->name('category.update');
    Route::delete('/admin/store/product/delete/{id}', [ProductController::class, 'deleteProduct'])->name('product.delete');
    Route::post('/admin/store/product/add', [ProductController::class, 'addProduct'])->name('product.add');
    Route::put('/admin/store/product/update/{id}', [ProductController::class, 'updateProduct'])->name('product.update');
});

require __DIR__ . '/auth.php';
