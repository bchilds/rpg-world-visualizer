export const viewModes = {
  viewport: 'viewport',
  overview: 'overview',
} as const;
export type ViewMode = keyof typeof viewModes;