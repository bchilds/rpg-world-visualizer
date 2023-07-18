import { Faction } from './faction.types';
import { Item } from './items.types';
import { WorldLocation } from './location.types';

export type Character = {
    id: number;
    name: string;
    description?: string;
    locations: WorldLocation['id'][];
    locationNotes: {
        [locationId: WorldLocation['id']]: string;
    };
    stats: unknown;
    loot: Item[];
    primaryFaction: Faction | null;
    tags: string[];
    // linkedCharacters: Character['id'][] // I don't wanna do it this way, but I could
};
