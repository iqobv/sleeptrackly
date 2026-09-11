import { Prisma } from '@generated/prisma/client';
import { productInclude } from '@libs/prisma/product.include.prisma';

export type ProductWithInclude = Prisma.ProductGetPayload<{
	include: ReturnType<typeof productInclude>;
}>;
