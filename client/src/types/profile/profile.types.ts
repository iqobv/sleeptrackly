import { IFriendship } from '../friend/friendship.types';
import { IEquippedItems } from '../item/equippedItems.types';

export interface IProfile {
	id: string;
	username: string;
	avatar: {
		url: string;
		isDefault: boolean;
	};
	equippedItems: IEquippedItems[];
	friendship: IFriendship | null;
	completedChallenges: number;
	sleepEntries: number;
	createdAt: Date;
}
