import { Prisma } from '@prisma/client';
import { productInclude } from 'src/libs/prisma';

export type ProductWithInclude = Prisma.ProductGetPayload<{
	include: ReturnType<typeof productInclude>;
}>;
