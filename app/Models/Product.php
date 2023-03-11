<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'price', 'stock', 'image', 'category_id', 'room_id'];

    public function productBelongsRoom(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }
}
