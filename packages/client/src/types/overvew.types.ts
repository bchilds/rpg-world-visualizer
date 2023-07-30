export const overviewToolMode = ['select', 'reassign', 'delete'] as const;
export type OverviewToolMode = (typeof overviewToolMode)[number];
