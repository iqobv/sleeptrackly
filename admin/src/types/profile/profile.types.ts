import { Friendship } from '../friend/friendship.types';
import { EquippedItems } from '../item/equippedItems.types';
import { ProfileStatistics } from './profileStatistics.types';

export interface Profile {
	id: string;
	username: string;
	avatar: {
		url: string;
		isDefault: boolean;
	};
	equippedItems: EquippedItems[];
	friendship: Friendship | null;
	statistics: ProfileStatistics | null;
	createdAt: Date;
}
