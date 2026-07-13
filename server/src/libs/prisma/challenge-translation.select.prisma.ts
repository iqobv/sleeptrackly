import { Prisma } from '@generated/prisma/client';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const challengeTranslationSelect = (language: string) =>
	({
		translations: {
			where: { language: { in: [language, 'en'] } },
			select: { title: true, description: true, language: true },
		},
	}) satisfies Prisma.ChallengeSelect;
