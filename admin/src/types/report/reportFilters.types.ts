export const SortBy = {
	createdAt: 'createdAt',
	updatedAt: 'updatedAt',
} as const;

export type SortBy = (typeof SortBy)[keyof typeof SortBy];
