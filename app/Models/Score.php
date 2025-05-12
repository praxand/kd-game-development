<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Score extends Model
{
    protected $fillable = [
        'user_id',
        'score',
        'lives',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
