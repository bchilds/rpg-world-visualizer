import { DamageType } from './damage.types';


export type Item = {
  id: number;
  name: string;
  description: string;
  amount: number;
};

export type Weapon = Item & {
  damage: number;
  range: number;
  type: DamageType;
  modifiers: {
    good: string[];
    bad: string[];
  };
};

// covers shit like gems, art, rare coins, sea shells
export type Currency = Item & {
    name: string;
    value: number;
}
