import { CoinTransactionType, Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
	CoinTransactionDto,
	CreateCoinTransactionDto,
	CreatedCoinTransactionDto,
} from './dto';

@Injectable()
export class CoinTransactionService {
	constructor(private readonly prismaService: PrismaService) {}

	public async createTransaction(
		dto: CreateCoinTransactionDto,
		tx?: Prisma.TransactionClient,
	): Promise<CreatedCoinTransactionDto> {
		const { amount, transactionType, userId, referenceId, meta } = dto;

		const execute = async (
			client: Prisma.TransactionClient,
		): Promise<CreatedCoinTransactionDto> => {
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

		return tx
			? await execute(tx)
			: await this.prismaService.$transaction(execute);
	}

	public async getUserTransactions(
		userId: string,
	): Promise<CoinTransactionDto[]> {
		const transactions = await this.prismaService.coinTransaction.findMany({
			where: { userId },
			orderBy: { createdAt: 'desc' },
		});

		return plainToInstance(CoinTransactionDto, transactions);
	}

	public async getLastTransactionByType(
		userId: string,
		type: CoinTransactionType,
	): Promise<CoinTransactionDto | null> {
		return await this.prismaService.coinTransaction.findFirst({
			where: { userId, type },
			orderBy: { createdAt: 'desc' },
		});
	}

	public async getLastTransactionToday(
		userId: string,
		type?: CoinTransactionType,
	): Promise<CoinTransactionDto[]> {
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
