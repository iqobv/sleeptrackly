import { IEquippedItems } from '../item/equippedItems.types';

export interface IUser {
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
	equippedItems: IEquippedItems[];
}
