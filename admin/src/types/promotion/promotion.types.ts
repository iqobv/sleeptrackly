export interface Promotion {
	id: string;
	alias: string;
	maxUses: number | null;
	usedCount: number;
	coinsReward: number | null;
	productIdReward: string | null;
	expiresAt: Date;
	createdAt: Date;
	updatedAt: Date;
}
