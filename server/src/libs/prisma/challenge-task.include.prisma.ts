import { Prisma } from '@generated/prisma/client';

export const challengeTaskInclude = {
	include: {
		userChallenge: {
			include: {
				user: { select: { id: true, timezone: true } },
				challenge: { include: { translations: { where: { language: 'en' } } } },
			},
		},
	},
} satisfies Prisma.ChallengeTaskDefaultArgs;
