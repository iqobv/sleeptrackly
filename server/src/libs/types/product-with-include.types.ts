import { Prisma } from '@generated/prisma/client';
import { productInclude } from '@libs/prisma';

export type ProductWithInclude = Prisma.ProductGetPayload<{
	include: ReturnType<typeof productInclude>;
}>;
