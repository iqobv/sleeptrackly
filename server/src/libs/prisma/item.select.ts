import { Prisma } from '@prisma/client';

export type ItemWithTranslations = Prisma.ItemGetPayload<{
	include: ReturnType<typeof itemSelect>;
}>;

export const itemSelect = (language: string) =>
	({
		translations: {
			where: { language: { in: [language, 'en'] } },
		},
	}) satisfies Prisma.ItemInclude;
