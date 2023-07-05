import { WorldLocation } from "./location.types";

export type Character = {
  id: number;
  name: string;
  description?: string;
  locations: WorldLocation['id'][];
  stats: unknown;
  loot: unknown;
};
