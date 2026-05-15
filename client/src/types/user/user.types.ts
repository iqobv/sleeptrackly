import { EquippedItems } from '../item/equippedItems.types';

export interface User {
	id: string;
	email: string;
	username: string;
	role: 'USER' | 'ADMIN';
	emailVerified: boolean;
	createdAt: Date;
	avatar: {
		url: string;
		isDefault: boolean;
	};
	coins: {
		amount: number;
	};
	equippedItems: EquippedItems[];
}
