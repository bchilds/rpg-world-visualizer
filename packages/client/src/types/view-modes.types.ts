export const viewModes = {
  viewport: 'viewport',
  characters: 'characters',
  overview: 'overview',
} as const;
export type ViewMode = keyof typeof viewModes;