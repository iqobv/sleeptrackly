import { Test, TestingModule } from '@nestjs/testing';
import {
	CoinTransaction,
	CoinTransactionType,
	UserCoin,
} from 'generated/prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
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
	let prisma: PrismaMock;

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
		prisma = {
			coinTransaction: {
				create: jest.fn(),
				findMany: jest.fn(),
				findUnique: jest.fn(),
			},
			userCoin: {
				findUnique: jest.fn(),
				update: jest.fn(),
			},
			$transaction: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CoinTransactionService,
				{
					provide: PrismaService,
					useValue: prisma,
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
			prisma.userCoin.findUnique.mockResolvedValue(userCoin);
			prisma.userCoin.update.mockResolvedValue({ ...userCoin, amount: 1100 });
			prisma.coinTransaction.create.mockResolvedValue(coinTransaction);

			prisma.$transaction.mockImplementation(
				async (cb: (client: PrismaMock) => Promise<CoinTransaction>) => {
					return cb(prisma);
				},
			);

			const result = await service.createTransaction({
				amount: 100,
				transactionType: CoinTransactionType.SLEEP_REWARD,
				userId: 'user_1',
			});

			expect(result.transaction).toEqual(coinTransaction);
			expect(result.balance).toEqual(1100);
			expect(prisma.userCoin.findUnique).toHaveBeenCalled();
			expect(prisma.coinTransaction.create).toHaveBeenCalled();
		});

		it('should throw InsufficientCoinsException when user has insufficient coins', async () => {
			prisma.userCoin.findUnique.mockResolvedValue(userCoin);
			prisma.$transaction.mockImplementation(
				async (cb: (client: PrismaMock) => Promise<CoinTransaction>) => {
					return cb(prisma);
				},
			);
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
