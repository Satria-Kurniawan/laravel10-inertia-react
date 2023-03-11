<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Room;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class CategoryController extends Controller
{
    public function deleteCategory($id): RedirectResponse
    {
        $category = Category::findOrFail($id);

        $productRelatedCategory = Product::where('category_id', $id)->first();

        if (!empty($productRelatedCategory)) {
            return Redirect::back()->withErrors(['error' => 'This category still has items, you cannot delete them!']);
        }

        $category->delete();

        return Redirect::route('store');
    }

    public function addCategory(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:16'
        ]);

        $userId = auth()->user()->id;
        $roomId = Room::select('id')->where('user_id', $userId)->first()->id;

        Category::create([
            'name' => $validated['name'],
            'room_id' => $roomId
        ]);

        return Redirect::route('store')->with(['message' => 'Category added successfully.']);
    }

    public function updateCategory(Request $request, $id): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:16'
        ]);

        $category = Category::findOrFail($id);

        $category->name = $validated['name'];
        $category->save();

        return Redirect::route('store')->with(['message' => 'Category updated successfully']);
    }
}
