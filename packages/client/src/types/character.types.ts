import { WorldLocation } from "./location.types";

export type Character = {
  id: number;
  name: string;
  description?: string;
  locations: WorldLocation['id'][];
  locationNotes: {
    [locationId: WorldLocation['id']]: string;
  };
  stats: unknown;
  loot: unknown;
};
