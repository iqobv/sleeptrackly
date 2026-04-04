import { Injectable, NotFoundException } from '@nestjs/common';
import { CoinTransactionType, Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { InsufficientCoinsException } from 'src/libs/exceptions';
import { CreateCoinTransactionDto } from './dto';

@Injectable()
export class CoinTransactionService {
	constructor(private readonly prismaService: PrismaService) {}

	async createTransaction(
		dto: CreateCoinTransactionDto,
		tx?: Prisma.TransactionClient,
	) {
		const { amount, transactionType, userId, referenceId, meta } = dto;

		const execute = async (client: Prisma.TransactionClient) => {
			const userCoin = await client.userCoin.findUnique({
				where: { userId },
			});

			if (!userCoin) throw new NotFoundException('User coin not found');

			if (amount < 0 && userCoin.amount + amount < 0) {
				throw new InsufficientCoinsException();
			}

			const updatedCoin = await client.userCoin.update({
				where: {
					id: userCoin.id,
					userId,
				},
				data: {
					amount: { increment: amount },
				},
			});

			const createdTransaction = await client.coinTransaction.create({
				data: {
					amount,
					balanceBefore: userCoin.amount,
					balanceAfter: updatedCoin.amount,
					type: transactionType,
					meta: meta ? JSON.stringify(meta) : undefined,
					user: { connect: { id: userId } },
					userCoin: { connect: { id: userCoin.id } },
					referenceId: referenceId || null,
				},
			});

			return {
				balance: updatedCoin.amount,
				transaction: createdTransaction,
			};
		};

		if (tx) {
			return execute(tx);
		}

		return this.prismaService.$transaction(async (newTx) => {
			return execute(newTx);
		});
	}

	async getUserTransactions(userId: string) {
		const transactions = await this.prismaService.coinTransaction.findMany({
			where: { userId },
			orderBy: { createdAt: 'desc' },
		});

		return transactions;
	}

	async getLastTransactionByType(userId: string, type: CoinTransactionType) {
		return await this.prismaService.coinTransaction.findFirst({
			where: { userId, type },
			orderBy: { createdAt: 'desc' },
		});
	}

	async getLastTransactionToday(userId: string, type?: CoinTransactionType) {
		const startOfToday = new Date();
		startOfToday.setHours(0, 0, 0, 0);

		return await this.prismaService.coinTransaction.findMany({
			where: {
				userId,
				createdAt: {
					gte: startOfToday,
				},
				...(type ? { type } : {}),
			},
			orderBy: { createdAt: 'desc' },
		});
	}
}
