import { Prisma } from '@generated/prisma/client';
import { challengeTaskInclude } from '@libs/prisma/challenge-task.include.prisma';

export type TaskPayload = Prisma.ChallengeTaskGetPayload<
	typeof challengeTaskInclude
>;
