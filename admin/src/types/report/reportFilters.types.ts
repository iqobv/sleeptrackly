export const SortBy = {
	createdAt: 'createdAt',
	updatedAt: 'updatedAt',
} as const;

export const SortOrder = {
	asc: 'asc',
	desc: 'desc',
} as const;

export type SortBy = (typeof SortBy)[keyof typeof SortBy];
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
