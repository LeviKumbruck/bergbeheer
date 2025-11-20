<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Mountain;

class MountainSeeder extends Seeder
{
    public function run(): void
    {
        $mountains = [
            [
                'name'        => 'Mont Blanc',
                'location'    => 'France / Italy',
                'height'      => 4808,
                'description' => 'Highest mountain in the Alps.'
            ],
            [
                'name'        => 'Matterhorn',
                'location'    => 'Switzerland / Italy',
                'height'      => 4478,
                'description' => 'Iconic pyramid-shaped mountain on the border.'
            ],
            [
                'name'        => 'Mount Everest',
                'location'    => 'Nepal / China',
                'height'      => 8848,
                'description' => 'Highest mountain above sea level on Earth.'
            ],
            [
                'name'        => 'Kilimanjaro',
                'location'    => 'Tanzania',
                'height'      => 5895,
                'description' => 'Free-standing stratovolcano and Africa’s highest peak.'
            ],
            [
                'name'        => 'Ben Nevis',
                'location'    => 'Scotland, United Kingdom',
                'height'      => 1345,
                'description' => 'Highest mountain in the British Isles.'
            ],
        ];

        foreach ($mountains as $mountain) {
            Mountain::create($mountain);
        }
    }
}
