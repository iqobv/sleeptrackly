import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import {
	AcquiredFrom,
	CoinTransactionType,
	Item,
	Prisma,
	ProductType,
	UserInventory,
} from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { transformProduct } from 'src/libs/mappers';
import { productInclude } from 'src/libs/prisma';
import { ProductWithInclude } from 'src/libs/types';
import { paginate } from 'src/libs/utils';
import { CoinTransactionService } from '../coin-transaction/coin-transaction.service';
import { PurchaseHistoryService } from '../purchase-history/purchase-history.service';
import { UserInventoryService } from '../user-inventory/user-inventory.service';
import { SHOP_SORT_BY } from './constats';
import { FilterQueryDto } from './dto';
import { TransformedProduct } from './types';

@Injectable()
export class ShopService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly coinTransactionService: CoinTransactionService,
		private readonly purchaseHistoryService: PurchaseHistoryService,
		private readonly userInventoryService: UserInventoryService,
	) {}

	async getFeaturedProducts(language: string, userId?: string) {
		const itemTypes = await this.prismaService.product.groupBy({
			by: ['itemType'],
			where: { isShowInStore: true, itemType: { not: null } },
		});

		const ownedItems = userId ? await this.getOwnedItems(userId) : [];

		const sections = await Promise.all(
			itemTypes.map(async (t) => {
				const products = await this.prismaService.product.findMany({
					where: { isShowInStore: true, itemType: t.itemType },
					take: 5,
					orderBy: { createdAt: 'desc' },
					include: productInclude(language),
				});

				let mappedProducts: TransformedProduct[] = products.map((product) =>
					transformProduct(product as ProductWithInclude, language),
				);

				if (userId) {
					mappedProducts = this.markOwnedProducts(
						ownedItems,
						mappedProducts,
						userId,
					);
				}

				return {
					itemType: t.itemType,
					items: mappedProducts,
				};
			}),
		);

		const bundles = await this.prismaService.product.findMany({
			where: { isShowInStore: true, type: ProductType.BUNDLE, isNew: true },
			take: 6,
			orderBy: { createdAt: 'desc' },
			include: productInclude(language),
		});

		let mappedBundles: TransformedProduct[] = bundles.map((product) =>
			transformProduct(product as ProductWithInclude, language),
		);

		if (userId) {
			mappedBundles = this.markOwnedProducts(ownedItems, mappedBundles, userId);
		}

		return {
			carousel: mappedBundles,
			sections,
		};
	}

	async getAllProducts(query: FilterQueryDto, userId?: string) {
		const {
			language = 'en',
			page = 1,
			limit = 20,
			itemType,
			type = 'ALL',
			search,
			sortBy = 'DATE',
			sortOrder = 'desc',
		} = query;

		const where: Prisma.ProductWhereInput = {
			isShowInStore: true,
			...(type === 'ALL' ? {} : { type }),
			...(itemType
				? type === 'BUNDLE'
					? {
							bundle: {
								items: {
									some: {
										item: { type: { in: itemType } },
									},
								},
							},
						}
					: { itemType: { in: itemType } }
				: {}),
			...(search
				? {
						OR: [
							{
								item: {
									translations: {
										some: { name: { contains: search, mode: 'insensitive' } },
									},
								},
							},
							{
								bundle: {
									translations: {
										some: { name: { contains: search, mode: 'insensitive' } },
									},
								},
							},
						],
					}
				: {}),
		};

		return await paginate({ page, limit }, async (limit, offset) => {
			const [total, products] = await this.prismaService.$transaction([
				this.prismaService.product.count({ where }),
				this.prismaService.product.findMany({
					where,
					orderBy: {
						[sortBy === SHOP_SORT_BY.DATE ? 'createdAt' : 'price']: sortOrder,
					},
					skip: offset,
					take: limit,
					include: productInclude(language),
				}),
			]);

			let mappedProducts: TransformedProduct[] = products.map((product) =>
				transformProduct(product as ProductWithInclude, language),
			);

			if (userId) {
				const ownedItems = await this.getOwnedItems(userId);
				mappedProducts = this.markOwnedProducts(
					ownedItems,
					mappedProducts,
					userId,
				);
			}

			return { items: mappedProducts, total };
		});
	}

	async getProductById(id: string, language: string = 'en') {
		const product = await this.prismaService.product.findFirst({
			where: { id, isShowInStore: true },
			include: productInclude(language),
		});

		if (!product) throw new NotFoundException('Product not found');

		return transformProduct(product as ProductWithInclude, language);
	}

	async purchaseProduct(userId: string, productId: string) {
		return await this.prismaService.$transaction(async (tx) => {
			const product = await tx.product.findUnique({
				where: { id: productId },
				include: {
					item: {
						include: {
							translations: { select: { language: true, name: true } },
						},
					},
					bundle: {
						include: {
							translations: { select: { language: true, name: true } },
							items: {
								include: {
									item: true,
								},
							},
						},
					},
				},
			});

			if (!product) throw new NotFoundException('Product not found');

			let items: Item[] = [];
			const initialPrice = product.discountedPrice ?? product.price;
			let finalPrice = initialPrice;

			if (product.itemId && product.item) {
				items = [product.item];
			} else if (product.bundleId && product.bundle) {
				items = product.bundle.items.map((bi) => bi.item);
			}

			const itemsIds = items.map((item) => item.id);

			const alreadyOwnedItems = await this.userInventoryService.getOwnedItemIds(
				userId,
				itemsIds,
				tx,
			);

			if (alreadyOwnedItems.length >= itemsIds.length) {
				throw new ConflictException('You already own this product');
			}

			const itemsToAdd = items.filter(
				(item) =>
					!alreadyOwnedItems.find((ownedItem) => ownedItem.itemId === item.id),
			);

			if (product.bundleId && product.bundle) {
				if (alreadyOwnedItems.length > 0) {
					finalPrice = this.calculateFinalPrice(
						items,
						initialPrice,
						alreadyOwnedItems,
					);
				}
			}

			const coinTransactionResult =
				await this.coinTransactionService.createTransaction(
					{
						amount: -finalPrice,
						transactionType: CoinTransactionType.SPEND,
						userId,
						referenceId: product.id,
					},
					tx,
				);

			const purchaseHistoryResult =
				await this.purchaseHistoryService.createPurchaseHistory(
					{
						userId,
						productId: product.id,
						transactionId: coinTransactionResult.transaction.id,
						nameSnapshot:
							product.item?.translations ?? product.bundle?.translations ?? [],
						pricePaid: finalPrice,
						priceSnapshot: initialPrice,
					},
					tx,
				);

			const inventoryResults =
				await this.userInventoryService.bulkAddItemsToInventory(
					itemsToAdd.map((item) => ({
						userId,
						itemId: item.id,
						acquiredAt: new Date(),
						acquiredFrom: AcquiredFrom.PURCHASE,
						isEquipped: false,
					})),
					tx,
				);

			return {
				coinTransaction: coinTransactionResult,
				purchaseHistory: purchaseHistoryResult,
				inventoryResults,
			};
		});
	}

	private calculateFinalPrice(
		items: Item[],
		initialPrice: number,
		alreadyOwnedItems: UserInventory[],
	) {
		let finalPrice = initialPrice;

		const totalBasePrice = items.reduce(
			(sum, i) => sum + (i.basePrice ?? 0),
			0,
		);

		if (totalBasePrice > 0) {
			const k = initialPrice / totalBasePrice;

			alreadyOwnedItems.forEach((ownedItem) => {
				const item = items.find((i) => i.id === ownedItem.itemId);
				if (item) {
					const itemWeight = Math.round(item.basePrice * k);
					finalPrice -= itemWeight;
				}
			});
		}

		return finalPrice;
	}

	private async getOwnedItems(userId: string) {
		const ownedItems = await this.prismaService.userInventory.findMany({
			where: { userId },
			select: { itemId: true },
		});

		return ownedItems;
	}

	private markOwnedProducts(
		ownedItems: {
			itemId: string;
		}[],
		mappedProducts: TransformedProduct[],
		userId: string,
	) {
		if (userId && ownedItems.length > 0) {
			const ownedItemIds = ownedItems.map((oi) => oi.itemId);
			mappedProducts.forEach((product) => {
				if (product.item && ownedItemIds.includes(product.item.id)) {
					product.isOwned = true;
				} else if (product.bundle) {
					const bundleItemIds = product.bundle.items.map((bi) => bi.item.id);
					const allItemsOwned = bundleItemIds.every((itemId) =>
						ownedItemIds.includes(itemId),
					);
					product.isOwned = allItemsOwned;
				} else {
					product.isOwned = false;
				}
			});
		} else {
			mappedProducts.forEach((p) => (p.isOwned = false));
		}

		return mappedProducts;
	}
}
