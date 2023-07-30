export const damageTypes = {
    blunt: 'blunt',
    piercing: 'piercing',
    slashing: 'slashing',
    fire: 'fire',
    cold: 'cold',
    lightning: 'lightning',
    acid: 'acid',
    poison: 'poison',
    necrotic: 'necrotic',
    radiant: 'radiant',
    psychic: 'psychic',
    force: 'force',
    thunder: 'thunder',
    magic: 'magic',
    physical: 'physical',
} as const;

export type DamageType = keyof typeof damageTypes;
