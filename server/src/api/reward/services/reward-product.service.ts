import { AcquiredFrom } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RewardProductService {
	constructor(private readonly prismaService: PrismaService) {}

	public async rewardProduct(
		productId: string,
		userId: string,
		acquiredFrom: AcquiredFrom = AcquiredFrom.REWARD,
	): Promise<void> {
		await this.prismaService.$transaction(async (tx) => {
			const product = await tx.product.findUnique({
				where: { id: productId },
				select: {
					itemId: true,
					bundle: { select: { items: { select: { itemId: true } } } },
				},
			});

			const rewardItemIds = product?.itemId
				? [product.itemId]
				: (product?.bundle?.items.map((bi) => bi.itemId) ?? []);

			if (rewardItemIds.length > 0) {
				const owned = await tx.userInventory.findMany({
					where: {
						userId,
						itemId: { in: rewardItemIds },
					},
					select: { itemId: true },
				});

				const ownedItemIds = new Set(owned.map((o) => o.itemId));

				const itemsToAdd = rewardItemIds.filter((id) => !ownedItemIds.has(id));

				if (itemsToAdd.length > 0) {
					await tx.userInventory.createMany({
						data: itemsToAdd.map((itemId) => ({
							acquiredFrom,
							acquiredAt: new Date(),
							userId,
							itemId,
						})),
						skipDuplicates: true,
					});
				}
			}
		});
	}
}
