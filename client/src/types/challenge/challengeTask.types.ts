export interface ChallengeTask {
	id: string;
	challengeId: string;
	description: string;
	targetValue: number;
	completedValue: number | null;
	isCompleted: boolean;
	startDate: Date;
	endDate: Date;
	createdAt: Date;
	updatedAt: Date;
}
