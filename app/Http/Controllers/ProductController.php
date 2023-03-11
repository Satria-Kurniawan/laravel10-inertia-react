<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Room;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

use function PHPUnit\Framework\isEmpty;

class ProductController extends Controller
{
    public function getDataByRoom(): Response
    {
        $userId = auth()->user()->id;
        $roomId = Room::select('id')->where('user_id', $userId)->first()->id;

        $categories = Category::where('room_id', $roomId)->latest()->get();
        $products = Product::where('room_id', $roomId)->latest()->get();


        return Inertia::render('Admin/Store', [
            'categories' => $categories,
            'products' => $products
        ]);
    }

    public function deleteProduct($id): RedirectResponse
    {
        $product = Product::findOrFail($id);

        $product->delete();

        return Redirect::back()->with(['message' => 'Product deleted successfully.']);
    }

    public function addProduct(Request $request): RedirectResponse
    {

        $validated = $request->validate([
            'name' => 'required|string|max:32',
            'price' => 'required',
            'stock' => 'required',
            'image' => 'nullable|string|mimes:jpeg,png,jpg|max:2048'
        ]);


        $userId = auth()->user()->id;
        $roomId = Room::select('id')->where('user_id', $userId)->first()->id;

        Product::create([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'image' => $validated['image'],
            'category_id' => $request->category_id,
            'room_id' => $roomId
        ]);

        return Redirect::route('store')->with(['message' => 'Item added successfully.']);
    }

    public function updateProduct(Request $request, $id): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:32',
            'price' => 'required',
            'stock' => 'required',
            'image' => 'nullable|string|mimes:jpeg,png,jpg|max:2048'
        ]);

        $product = Product::findOrFail($id);

        $product->name = $validated['name'];
        $product->price = $validated['price'];
        $product->stock = $validated['stock'];
        $product->image = $validated['image'];

        if ($request->category_id !== 0) {
            $product->category_id = $request->category_id;
        }

        $product->save();

        return Redirect::route('store')->with(['message' => 'Item updated successfully.']);
    }
}
