<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Ramsey\Uuid\Uuid;

class Room extends Model
{
    use HasFactory, HasUuids;

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $fillable = ["user_id"];

    public function generateUuid()
    {
        return Uuid::uuid4()->toString();
    }

    public function hasCategory(): HasMany
    {
        return $this->hasMany(Category::class, 'room_id');
    }

    public function hasProduct(): HasMany
    {
        return $this->hasMany(Product::class, 'room_id');
    }
}
