import { AchievementsPublisherService } from '@api/achievement/services/achievements-publisher.service';
import { CoinTransactionService } from '@api/coin-transaction/coin-transaction.service';
import { PurchaseHistoryService } from '@api/purchase-history/purchase-history.service';
import { UserInventoryService } from '@api/user-inventory/user-inventory.service';
import { Item, Prisma } from '@generated/prisma/client';
import {
	AchievementType,
	AcquiredFrom,
	CoinTransactionType,
	ProductType,
	ProfileItemType,
} from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { LanguageQueryDto } from '@libs/dto/language-query.dto';
import { pickTranslation } from '@libs/mappers/pick-translation.mapper';
import { transformProduct } from '@libs/mappers/translation-products.mapper';
import { productInclude } from '@libs/prisma/product.include.prisma';
import { paginate } from '@libs/utils/pagination.util';
import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FeaturedShopDto } from './dto/featured-shop.dto';
import { FilterQueryDto } from './dto/filter-query.dto';
import { FiltersDto } from './dto/filters.dto';
import { PaginatedShopProductsDto } from './dto/paginated-products.dto';
import { PurchaseDto } from './dto/purchase.dto';
import { ShopProductDto } from './dto/shop-product.dto';
import { ItemsToAdd } from './interfaces/items-to-add.interface';
import { ShopSortBy } from './types/sort-by.types';
import { TransformedProduct } from './types/transformed-product.types';

@Injectable()
export class ShopService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly coinTransactionService: CoinTransactionService,
		private readonly purchaseHistoryService: PurchaseHistoryService,
		private readonly userInventoryService: UserInventoryService,
		private readonly achievementPublisherService: AchievementsPublisherService,
	) {}

	public async getFeaturedProducts(
		language: string,
		userId?: string,
	): Promise<FeaturedShopDto> {
		const ownedItems = userId ? await this.getOwnedItems(userId) : [];

		const bundles = await this.prismaService.product.findMany({
			where: { isShowInStore: true, type: ProductType.BUNDLE, isNew: true },
			take: 6,
			orderBy: { createdAt: 'desc' },
			include: productInclude(language),
		});

		const itemTypes = await this.prismaService.product.groupBy({
			by: ['itemType'],
			where: { isShowInStore: true, itemType: { not: null } },
		});

		const sections = await Promise.all(
			itemTypes.map(async (t) => {
				const products = await this.prismaService.product.findMany({
					where: { isShowInStore: true, itemType: t.itemType },
					take: 5,
					orderBy: { createdAt: 'desc' },
					include: productInclude(language),
				});

				let mappedProducts: TransformedProduct[] = products.map((product) =>
					transformProduct(product, language),
				);

				if (userId) {
					mappedProducts = this.markOwnedProducts(
						ownedItems,
						mappedProducts,
						userId,
					);
				}

				return {
					itemType: t.itemType as ProfileItemType,
					items: mappedProducts,
				};
			}),
		);

		const collections = await this.prismaService.collection.findMany({
			where: { showInStore: true },
			orderBy: { createdAt: 'desc' },
			take: 5,
			include: {
				translations: {
					where: {
						language: {
							in: [language, 'en'],
						},
					},
					select: { language: true, name: true },
				},
				products: {
					include: {
						product: {
							include: productInclude(language),
						},
					},
				},
			},
		});

		let mappedBundles: TransformedProduct[] = bundles.map((product) =>
			transformProduct(product, language),
		);

		let mappedCollections = collections.map(
			({ translations, products, ...rest }) => ({
				...rest,
				name:
					pickTranslation(translations, language)?.name ?? 'Unnamed Collection',
				products: products.slice(0, 4).map((cp) => ({
					...cp,
					product: transformProduct(cp.product, language),
				})),
			}),
		);

		if (userId) {
			mappedBundles = this.markOwnedProducts(ownedItems, mappedBundles, userId);
			mappedCollections = mappedCollections.map((collection) => ({
				...collection,
				products: collection.products.map((cp) => ({
					...cp,
					product: this.markOwnedProducts(ownedItems, [cp.product], userId)[0],
				})),
			}));
		}

		const result: FeaturedShopDto = {
			carousel: mappedBundles,
			collections: mappedCollections,
			sections,
		};

		return plainToInstance(FeaturedShopDto, result);
	}

	public async getAllProducts(
		query: FilterQueryDto,
		userId?: string,
	): Promise<PaginatedShopProductsDto> {
		const {
			language = 'en',
			page = 1,
			limit = 20,
			itemType,
			type = 'ALL',
			search,
			sortBy = 'DATE',
			sortOrder = 'desc',
			collection,
			maxPrice,
			minPrice,
		} = query;

		const where: Prisma.ProductWhereInput = {
			isShowInStore: true,
			...(collection
				? {
						collections: {
							some: {
								collection: {
									showInStore: true,
									slug: { in: collection },
								},
							},
						},
					}
				: undefined),
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
			...(minPrice !== undefined || maxPrice !== undefined
				? {
						OR: [
							{
								discountedPrice: {
									not: null,
									...(minPrice !== undefined ? { gte: minPrice } : {}),
									...(maxPrice !== undefined ? { lte: maxPrice } : {}),
								},
							},
							{
								discountedPrice: null,
								price: {
									...(minPrice !== undefined && { gte: minPrice }),
									...(maxPrice !== undefined && { lte: maxPrice }),
								},
							},
						],
					}
				: {}),
		};

		const result = await paginate({ page, limit }, async (limit, offset) => {
			const [total, products] = await this.prismaService.$transaction([
				this.prismaService.product.count({ where }),
				this.prismaService.product.findMany({
					where,
					orderBy: {
						[sortBy === ShopSortBy.DATE ? 'createdAt' : 'price']: sortOrder,
					},
					skip: offset,
					take: limit,
					include: productInclude(language),
				}),
			]);

			let mappedProducts: TransformedProduct[] = products.map((product) =>
				transformProduct(product, language),
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

		return plainToInstance(PaginatedShopProductsDto, result);
	}

	public async getProductById(
		id: string,
		language: string = 'en',
	): Promise<ShopProductDto> {
		const product = await this.prismaService.product.findFirst({
			where: { id, isShowInStore: true },
			include: productInclude(language),
		});

		if (!product) throw new NotFoundException(ERROR_MESSAGES.PRODUCT.NOT_FOUND);

		const tranformedProduct = transformProduct(product, language);

		return plainToInstance(ShopProductDto, tranformedProduct);
	}

	public async purchaseProduct(
		userId: string,
		productId: string,
		language: string = 'en',
	): Promise<PurchaseDto> {
		const result = await this.prismaService.$transaction(async (tx) => {
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

			if (!product)
				throw new NotFoundException(ERROR_MESSAGES.PRODUCT.NOT_FOUND);

			let items: Item[] = [];
			const initialPrice = product.discountedPrice ?? product.price;
			let finalPrice = initialPrice;

			if (product.itemId && product.item) {
				items = [product.item];
			} else if (product.bundleId && product.bundle) {
				items = product.bundle.items.map((bi) => bi.item);
			}

			const { alreadyOwnedItems, itemsToAdd } = await this.getItemsToAdd(
				items,
				userId,
				tx,
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

			await this.achievementPublisherService.dispatchProgressCheck({
				userId,
				type: AchievementType.ITEMS_PURCHASED,
			});

			const translations = (purchaseHistoryResult.nameSnapshot || []) as {
				language: string;
				name: string;
			}[];

			const translation = pickTranslation(translations, language) ?? {
				language,
				name: 'Unknown Product',
			};

			return {
				coinTransaction: coinTransactionResult,
				purchaseHistory: {
					...purchaseHistoryResult,
					nameSnapshot: translation,
				},
				inventoryResults,
			};
		});

		return result;
	}

	public async getItemsToAdd(
		items: Item[],
		userId: string,
		tx?: Prisma.TransactionClient,
	): Promise<ItemsToAdd> {
		const itemsIds = items.map((item) => item.id);

		const alreadyOwnedItems = await this.userInventoryService.getOwnedItemIds(
			userId,
			itemsIds,
			tx,
		);

		if (alreadyOwnedItems.length >= itemsIds.length) {
			throw new ConflictException(
				ERROR_MESSAGES.USER_INVENTORY.ITEM_ALREADY_OWNED,
			);
		}

		const itemsToAdd = items.filter(
			(item) =>
				!alreadyOwnedItems.find((ownedItem) => ownedItem.itemId === item.id),
		);

		return { alreadyOwnedItems, itemsToAdd };
	}

	public async getFilters(query: LanguageQueryDto): Promise<FiltersDto> {
		const { language = 'en' } = query;

		const collections = await this.prismaService.collection.findMany({
			where: { showInStore: true },
			select: {
				slug: true,
				translations: {
					where: { language: { in: [language, 'en'] } },
					select: { name: true, language: true },
				},
			},
		});

		const mappedCollections = collections
			.map((collection) => {
				const translation = pickTranslation(collection.translations, language);

				return {
					slug: collection.slug,
					name: translation?.name || 'No name',
				};
			})
			.sort((a, b) => a.name.localeCompare(b.name));

		const prices = await this.prismaService.product.aggregate({
			where: { isShowInStore: true },
			_min: { price: true, discountedPrice: true },
			_max: { price: true, discountedPrice: true },
		});

		const minValues = [prices._min.price, prices._min.discountedPrice].filter(
			(p) => p !== null,
		);
		const finalMinPrice = minValues.length > 0 ? Math.min(...minValues) : 0;

		const maxValues = [prices._max.price, prices._max.discountedPrice].filter(
			(p) => p !== null,
		);
		const finalMaxPrice = maxValues.length > 0 ? Math.max(...maxValues) : 0;

		return plainToInstance(FiltersDto, {
			collections: mappedCollections,
			priceRange: {
				min: finalMinPrice,
				max: finalMaxPrice,
			},
		});
	}

	private calculateFinalPrice(
		items: Item[],
		initialPrice: number,
		alreadyOwnedItems: { itemId: string }[],
	): number {
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

	private async getOwnedItems(userId: string): Promise<{ itemId: string }[]> {
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
	): TransformedProduct[] {
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
