import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { PaginationQueryWithLanguageDto } from 'src/libs/dto';
import { pickTranslation } from 'src/libs/mappers';
import { paginate } from 'src/libs/utils';
import { CreatePurchaseHistoryDto } from './dto';

@Injectable()
export class PurchaseHistoryService {
	constructor(private readonly prismaService: PrismaService) {}

	async createPurchaseHistory(
		dto: CreatePurchaseHistoryDto,
		tx?: Prisma.TransactionClient,
	) {
		const { userId, productId, transactionId, ...rest } = dto;

		const execute = async (client: Prisma.TransactionClient) => {
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

	async getUserPurchaseHistories(
		userId: string,
		query: PaginationQueryWithLanguageDto,
	) {
		const { language = 'en', limit, page } = query;

		return await paginate({ limit, page }, async (limit, offset) => {
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
				const translations = (item.nameSnapshot || []) as unknown as {
					language: string;
					name: string;
				}[];

				const translation = pickTranslation(translations, language);
				return {
					...item,
					nameSnapshot: translation,
				};
			});

			return { total, items: mappedItems };
		});
	}
}
