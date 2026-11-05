import {
	CoinTransaction,
	CoinTransactionType,
	UserCoin,
} from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { prismaMock } from '@libs/prisma/prisma.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { mockReset } from 'jest-mock-extended';
import { CoinTransactionService } from './coin-transaction.service';

type PrismaMock = {
	coinTransaction: {
		create: jest.Mock;
		findMany: jest.Mock;
		findUnique: jest.Mock;
	};
	userCoin: {
		findUnique: jest.Mock;
		update: jest.Mock;
	};
	$transaction: jest.Mock;
};

describe('CoinTransactionService', () => {
	let service: CoinTransactionService;

	const userCoin: UserCoin = {
		id: 'uc_1',
		userId: 'user_1',
		amount: 1000,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const coinTransaction: CoinTransaction = {
		id: 'ct_1',
		userId: 'user_1',
		userCoinId: 'uc_1',
		amount: 100,
		type: CoinTransactionType.SLEEP_REWARD,
		balanceAfter: 1100,
		balanceBefore: 1000,
		meta: null,
		referenceId: null,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	beforeEach(async () => {
		mockReset(prismaMock);

		prismaMock.$transaction.mockImplementation(async (cb) => cb(prismaMock));

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CoinTransactionService,
				{
					provide: PrismaService,
					useValue: prismaMock,
				},
			],
		}).compile();

		service = module.get<CoinTransactionService>(CoinTransactionService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('createCoinTransaction', () => {
		it('should create a coin transaction', async () => {
			prismaMock.userCoin.findUnique.mockResolvedValue(userCoin);
			prismaMock.userCoin.update.mockResolvedValue({
				...userCoin,
				amount: 1100,
			});
			prismaMock.coinTransaction.create.mockResolvedValue(coinTransaction);

			const result = await service.createTransaction({
				amount: 100,
				transactionType: CoinTransactionType.SLEEP_REWARD,
				userId: 'user_1',
			});

			expect(result.transaction).toEqual(coinTransaction);
			expect(result.balance).toEqual(1100);
			expect(prismaMock.userCoin.findUnique).toHaveBeenCalled();
			expect(prismaMock.coinTransaction.create).toHaveBeenCalled();
		});

		it('should throw InsufficientCoinsException when user has insufficient coins', async () => {
			prismaMock.userCoin.findUnique.mockResolvedValue(userCoin);

			await expect(
				service.createTransaction({
					amount: -2000,
					transactionType: CoinTransactionType.SPEND,
					userId: 'user_1',
				}),
			).rejects.toThrow('Insufficient coins');
		});
	});
});
