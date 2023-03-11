<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'price' => fake()->randomDigit(),
            'stock' => fake()->randomDigit(),
            'image' => null,
            'category_id' => Category::factory(),
            'room_id' => 'b607f794-74cb-4b65-ad4c-9ccb5533c211'
        ];
    }
}
