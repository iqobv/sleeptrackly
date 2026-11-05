import { CoinTransaction } from '@generated/prisma/client';
import { CoinTransactionType } from '@generated/prisma/enums';
import { partialMock } from '@libs/utils/mock-helper.util';
import { Test, TestingModule } from '@nestjs/testing';
import { mock, mockReset } from 'jest-mock-extended';
import { CoinTransactionService } from '../../../coin-transaction/coin-transaction.service';
import { RewardService } from '../reward.service';

describe('RewardService', () => {
	let service: RewardService;
	let coinTransactionService = mock<CoinTransactionService>();

	const userId = 'user_123';
	const sleepEntryId = 'sleep_456';

	const mockNowDate = new Date(`2026-10-20T12:00:00Z`);

	beforeAll(() => {
		jest.useFakeTimers().setSystemTime(mockNowDate);
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	beforeEach(async () => {
		mockReset(coinTransactionService);

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
			const recentDate = mockNowDate;
			recentDate.setHours(recentDate.getHours() - 2);

			coinTransactionService.getLastTransactionToday.mockResolvedValue([
				partialMock<CoinTransaction>({ createdAt: recentDate, amount: 10 }),
			]);

			const result = await service.rewardForSleep(userId, sleepEntryId, 480);

			expect(result).toEqual({ rewarded: false, amount: 0 });
			expect(coinTransactionService.createTransaction).not.toHaveBeenCalled();
		});

		it('should return rewarded false if DAILY_MAX limit is already reached', async () => {
			const oldDate = mockNowDate;
			oldDate.setHours(oldDate.getHours() - 15);

			coinTransactionService.getLastTransactionToday.mockResolvedValue([
				partialMock<CoinTransaction>({ createdAt: oldDate, amount: 50 }),
			]);

			const result = await service.rewardForSleep(userId, sleepEntryId, 480);

			expect(result).toEqual({ rewarded: false, amount: 0 });
		});

		it('should successfully reward user for ideal sleep duration', async () => {
			coinTransactionService.getLastTransactionToday.mockResolvedValue([]);
			coinTransactionService.createTransaction.mockResolvedValue({
				balance: 100,
				transaction: partialMock<CoinTransaction>({
					userId,
					amount: 30,
					type: CoinTransactionType.SLEEP_REWARD,
					referenceId: sleepEntryId,
				}),
			});

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
				undefined,
			);
		});

		it('should cap the reward if it exceeds DAILY_MAX', async () => {
			const oldDate = mockNowDate;
			oldDate.setHours(oldDate.getHours() - 15);

			coinTransactionService.getLastTransactionToday.mockResolvedValue([
				partialMock<CoinTransaction>({ createdAt: oldDate, amount: 45 }),
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
