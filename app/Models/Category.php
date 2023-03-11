<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'room_id'];

    public function categoryBelongsRoom(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }
}
