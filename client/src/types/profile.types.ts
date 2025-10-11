import { IFriendship } from './friendship.types';

export interface IProfile {
	id: string;
	username: string;
	avatar: {
		url: string;
		isDefault: boolean;
	};
	friendship: IFriendship | null;
	completedChallenges: number;
	sleepEntries: number;
	createdAt: Date;
}
