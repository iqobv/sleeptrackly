export interface IProfile {
	username: string;
	avatar: {
		url: string;
		isDefault: boolean;
	};
	completedChallenges: number;
	sleepEntries: number;
	createdAt: Date;
}
