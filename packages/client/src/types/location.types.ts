// features aren't "locations". They're like interactables in a location that don't contain more space themselves.
// a building might be a feature if there's nowhere else it can lead to, and only has one or two rooms

import { Character } from './character.types';

// "dungeon" rooms should always be considered locations, however
export type Feature = {
    id: number;
    name: string;
    description?: string;
};

// most elements of the world design can be considered locations. The world itself is a location.
// characters can be associated to any location, and don't necessarily _belong_ there.
export type WorldLocation = {
    id: number;
    name: string;
    description?: string;
    childLocations: WorldLocation['id'][];
    features: Feature['id'][];
    characters: Character['id'][];
};
