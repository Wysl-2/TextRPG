// src/lib/game/game.svelte.ts

import type { Campsite } from './types';
import { initialCampsite } from './initialState';

export class Game {
    campsite: Campsite = $state(structuredClone(initialCampsite));

    update(deltaTime: number) {
        const fire = this.campsite.fire;

        if (fire.status !== 'lit') {
            return;
        }

        fire.fuel = Math.max(
            0,
            fire.fuel - fire.burnRate * deltaTime
        );

        if (fire.fuel === 0) {
            fire.status = 'extinguished';
        }
    }
}