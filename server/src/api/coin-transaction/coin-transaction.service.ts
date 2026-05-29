import { CoinTransactionType, Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
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

			if (!userCoin) throw new NotFoundException(ERROR_MESSAGES.COIN.NOT_FOUND);

			if (amount < 0 && userCoin.amount + amount < 0)
				throw new BadRequestException(
					ERROR_MESSAGES.COIN_TRANSACTION.INSUFFICIENT_FUNDS,
				);

			const updatedCoin = await client.userCoin.update({
				where: { id: userCoin.id },
				data: { amount: { increment: amount } },
			});

			const createdTransaction = await client.coinTransaction.create({
				data: {
					amount,
					balanceBefore: userCoin.amount,
					balanceAfter: updatedCoin.amount,
					type: transactionType,
					meta: meta ? (meta as Prisma.InputJsonValue) : undefined,
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

		return tx ? execute(tx) : this.prismaService.$transaction(execute);
	}

	async getUserTransactions(userId: string) {
		return await this.prismaService.coinTransaction.findMany({
			where: { userId },
			orderBy: { createdAt: 'desc' },
		});
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
				createdAt: { gte: startOfToday },
				...(type ? { type } : {}),
			},
			orderBy: { createdAt: 'desc' },
		});
	}
}
