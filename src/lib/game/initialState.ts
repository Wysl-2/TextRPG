// src/lib/game/initialState.ts

import type { Campsite } from './types';

export const initialCampsite: Campsite = {
    id: 'camp-001',
    locationId: 'starting-clearing',
    status: 'established',
    fire: {
        fuel: 50,
        maxFuel: 100,
        burnRate: 1,
        status: 'extinguished'
    },
    storage: {
        wood: 10,
        stone: 5,
        food: 3
    }
};