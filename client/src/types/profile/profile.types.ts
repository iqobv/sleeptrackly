import { IFriendship } from '../friend/friendship.types';
import { IEquippedItems } from '../item/equippedItems.types';
import { IProfileStatistics } from './profileStatistics.types';

export interface IProfile {
	id: string;
	username: string;
	avatar: {
		url: string;
		isDefault: boolean;
	};
	equippedItems: IEquippedItems[];
	friendship: IFriendship | null;
	statistics: IProfileStatistics | null;
	createdAt: Date;
}
