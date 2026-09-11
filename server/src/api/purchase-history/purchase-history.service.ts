import { Prisma, PurchaseHistory } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { PaginationQueryWithLanguageDto } from '@libs/dto/pagination-language-query.dto';
import { TranslationDto } from '@libs/dto/translation.dto';
import { pickTranslation } from '@libs/mappers/pick-translation.mapper';
import { paginate } from '@libs/utils/pagination.util';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreatePurchaseHistoryDto } from './dto/create-purchase-history.dto';
import { PaginatedPurchaseHistoryDto } from './dto/paginated-purchase-history.dto';

@Injectable()
export class PurchaseHistoryService {
	constructor(private readonly prismaService: PrismaService) {}

	public async createPurchaseHistory(
		dto: CreatePurchaseHistoryDto,
		tx?: Prisma.TransactionClient,
	): Promise<PurchaseHistory> {
		const { userId, productId, transactionId, ...rest } = dto;

		const execute = async (
			client: Prisma.TransactionClient,
		): Promise<PurchaseHistory> => {
			const purchaseHistory = await client.purchaseHistory.create({
				data: {
					user: { connect: { id: userId } },
					product: { connect: { id: productId } },
					transaction: { connect: { id: transactionId } },
					...rest,
				},
			});

			return purchaseHistory;
		};

		if (tx) {
			return execute(tx);
		}

		return await this.prismaService.$transaction(async (client) => {
			return execute(client);
		});
	}

	public async getUserPurchaseHistories(
		userId: string,
		query: PaginationQueryWithLanguageDto,
	): Promise<PaginatedPurchaseHistoryDto> {
		const { language = 'en', limit, page } = query;

		const result = await paginate({ limit, page }, async (limit, offset) => {
			const [total, items] = await this.prismaService.$transaction([
				this.prismaService.purchaseHistory.count({ where: { userId } }),
				this.prismaService.purchaseHistory.findMany({
					where: { userId },
					orderBy: { createdAt: 'desc' },
					skip: offset,
					take: limit,
				}),
			]);

			const mappedItems = items.map((item) => {
				const translations = (item.nameSnapshot ||
					[]) as unknown as TranslationDto[];

				const translation = pickTranslation(translations, language);

				return {
					...item,
					nameSnapshot: translation ?? { language, name: 'Unknown Product' },
				};
			});

			return { total, items: mappedItems };
		});

		return plainToInstance(PaginatedPurchaseHistoryDto, result);
	}
}
