// src/lib/game/game.svelte.ts

import type { Campsite } from './types';
import { initialCampsite } from './initialState';

export class Game {
    campsite: Campsite = $state(structuredClone(initialCampsite));
}