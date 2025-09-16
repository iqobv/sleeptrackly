import { IChallengeTask } from './challengeTask.types';

export interface IChallenge {
	id: string;
	userId: string;
	title: string;
	description: string;
	frequency: string;
	isStarted: boolean;
	isCompleted: boolean;
	startDate: Date;
	endDate: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface IChallengeFull extends IChallenge {
	tasks: IChallengeTask[];
}
