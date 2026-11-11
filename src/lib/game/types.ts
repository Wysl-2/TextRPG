export type Player = {
    id: string;
    locationId: string;
    inventory: Inventory;
    campsiteId: string | null;
};

export type CampsiteStatus = 'established' | 'packed';

export type Campsite = {
    id: string;
    locationId: string | null;
    status: CampsiteStatus;
    fire: Campfire;
    storage: Inventory;
};

export type CampfireStatus = 'lit' | 'extinguished';

export type Campfire = {
    fuel: number;
    maxFuel: number;
    burnRate: number;
    status: CampfireStatus;
}

export type ResourceType = 'wood' | 'stone' | 'food';

export type Inventory = Partial<Record<ResourceType, number>>;