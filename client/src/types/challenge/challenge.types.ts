import { ChallengeFrequency } from './challengeFrequncy.types';
import { ChallengeTask } from './challengeTask.types';

export interface Challenge {
	id: string;
	userId: string;
	title: string;
	description: string;
	frequency: ChallengeFrequency;
	isStarted: boolean;
	isCompleted: boolean;
	startDate: Date;
	endDate: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface ChallengeFull extends Challenge {
	tasks: ChallengeTask[];
}
