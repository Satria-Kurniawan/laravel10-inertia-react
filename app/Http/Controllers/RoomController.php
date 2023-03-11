<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function store(Request $request)
    {
        $userId = $request->user()->id;
        $room = new Room();

        $room->id = $room->generateUuid();
        $room->user_id = $userId;
        $room->save();

        return to_route('registerPOS.waiting');
    }
}
