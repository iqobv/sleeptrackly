import { Test, TestingModule } from '@nestjs/testing';
import { CoinTransactionType } from 'generated/prisma/enums';
import { CoinTransactionService } from '../coin-transaction/coin-transaction.service';
import { RewardService } from './reward.service';

type CoinTransactionServiceMock = {
	getLastTransactionToday: jest.Mock;
	createTransaction: jest.Mock;
};

describe('RewardService', () => {
	let service: RewardService;
	let coinTransactionService: CoinTransactionServiceMock;

	const userId = 'user_123';
	const sleepEntryId = 'sleep_456';

	beforeEach(async () => {
		coinTransactionService = {
			getLastTransactionToday: jest.fn(),
			createTransaction: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				RewardService,
				{
					provide: CoinTransactionService,
					useValue: coinTransactionService,
				},
			],
		}).compile();

		service = module.get<RewardService>(RewardService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('rewardForSleep', () => {
		it('should return rewarded false if there is a recent reward within 12 hours', async () => {
			const recentDate = new Date();
			recentDate.setHours(recentDate.getHours() - 2);

			coinTransactionService.getLastTransactionToday.mockResolvedValue([
				{ createdAt: recentDate, amount: 10 },
			]);

			const result = await service.rewardForSleep(userId, sleepEntryId, 480);

			expect(result).toEqual({ rewarded: false, amount: 0 });
			expect(coinTransactionService.createTransaction).not.toHaveBeenCalled();
		});

		it('should return rewarded false if DAILY_MAX limit is already reached', async () => {
			const oldDate = new Date();
			oldDate.setHours(oldDate.getHours() - 15);

			coinTransactionService.getLastTransactionToday.mockResolvedValue([
				{ createdAt: oldDate, amount: 50 },
			]);

			const result = await service.rewardForSleep(userId, sleepEntryId, 480);

			expect(result).toEqual({ rewarded: false, amount: 0 });
		});

		it('should successfully reward user for ideal sleep duration', async () => {
			coinTransactionService.getLastTransactionToday.mockResolvedValue([]);
			coinTransactionService.createTransaction.mockResolvedValue({});

			const result = await service.rewardForSleep(userId, sleepEntryId, 480);

			expect(result.rewarded).toBe(true);
			expect(result.amount).toBeGreaterThan(0);
			expect(coinTransactionService.createTransaction).toHaveBeenCalledWith(
				expect.objectContaining({
					userId,
					amount: result.amount,
					transactionType: CoinTransactionType.SLEEP_REWARD,
					referenceId: sleepEntryId,
				}),
			);
		});

		it('should cap the reward if it exceeds DAILY_MAX', async () => {
			const oldDate = new Date();
			oldDate.setHours(oldDate.getHours() - 15);

			coinTransactionService.getLastTransactionToday.mockResolvedValue([
				{ createdAt: oldDate, amount: 45 },
			]);

			const result = await service.rewardForSleep(userId, sleepEntryId, 480);

			expect(result.rewarded).toBe(true);
			expect(result.amount).toBe(5);
		});

		it('should return 0 amount if sleep duration is less than MIN_HOURS', async () => {
			coinTransactionService.getLastTransactionToday.mockResolvedValue([]);

			const result = await service.rewardForSleep(userId, sleepEntryId, 60);

			expect(result).toEqual({ rewarded: false, amount: 0 });
		});
	});

	describe('Internal Calculation Logic (Private methods testing via public)', () => {
		it('should apply higher multiplier for ideal sleep range (7-9 hours)', async () => {
			coinTransactionService.getLastTransactionToday.mockResolvedValue([]);

			const result = await service.rewardForSleep(userId, sleepEntryId, 480);

			expect(result.amount).toBeGreaterThan(25);
		});
	});
});
