import { Challenge, UserChallenge } from '@generated/prisma/client';

export class CompleteChallengeTaskDto {
	userChallenge: UserChallenge & { challenge: Challenge };
	taskId: string;
	sleepEntryId?: string;
	isRecovery?: boolean;
}
