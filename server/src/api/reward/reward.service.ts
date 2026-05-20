import { Prisma } from '@generated/prisma/client';
import { CoinTransactionType } from '@generated/prisma/enums';
import { Injectable } from '@nestjs/common';
import { CoinTransactionService } from '../coin-transaction/coin-transaction.service';
import { SLEEP_TIME } from './constants';
import { SleepRewardCalculation } from './interfaces';

@Injectable()
export class RewardService {
	private readonly BASE_SLEEP_REWARD: number = 10;

	constructor(
		private readonly coinTransactionService: CoinTransactionService,
	) {}

	async rewardForSleep(
		userId: string,
		sleepEntryId: string,
		durationMinutes: number,
		tx?: Prisma.TransactionClient,
	) {
		const DAILY_MAX = 50;
		const MIN_GAP_HOURS = 12;

		const lastRewards =
			await this.coinTransactionService.getLastTransactionToday(
				userId,
				CoinTransactionType.SLEEP_REWARD,
			);

		if (lastRewards.length > 0) {
			const MIN_GAP_MS = MIN_GAP_HOURS * 60 * 60 * 1000;
			const now = new Date();
			const lastRewardDate = new Date(lastRewards[0].createdAt);

			if (now.getTime() - lastRewardDate.getTime() < MIN_GAP_MS) {
				return { rewarded: false, amount: 0 };
			}
		}

		const rewardAmount = this.calculateRewardForSleep(durationMinutes);
		const totalRewardToday = lastRewards.reduce((sum, r) => sum + r.amount, 0);

		if (totalRewardToday >= DAILY_MAX) {
			return { rewarded: false, amount: 0 };
		}

		const finalRewardAmount = Math.min(
			rewardAmount.amount,
			DAILY_MAX - totalRewardToday,
		);

		if (finalRewardAmount > 0) {
			await this.coinTransactionService.createTransaction(
				{
					amount: finalRewardAmount,
					transactionType: CoinTransactionType.SLEEP_REWARD,
					userId,
					referenceId: sleepEntryId,
					meta: rewardAmount,
				},
				tx,
			);

			return { rewarded: true, amount: finalRewardAmount };
		}

		return { rewarded: false, amount: 0 };
	}

	private calculateRewardForSleep(
		durationMinutes: number,
	): SleepRewardCalculation {
		const timeMultiplier = this.getTimeMultiplier(durationMinutes);
		const MIN_MINUTES = SLEEP_TIME.MIN_HOURS * 60;
		const MIN_IDEAL_MINUTES = SLEEP_TIME.IDEAL_MIN * 60;
		const MAX_IDEAL_MINUTES = SLEEP_TIME.IDEAL_MAX * 60;

		if (timeMultiplier === 0) return { amount: 0, multiplier: 0, stepBonus: 0 };

		const isInIdealRange =
			durationMinutes >= MIN_IDEAL_MINUTES &&
			durationMinutes <= MAX_IDEAL_MINUTES;

		const stepBonus =
			Math.floor((durationMinutes - MIN_MINUTES) / (isInIdealRange ? 20 : 40)) *
			0.1;

		const finalAmount = Math.round(
			this.BASE_SLEEP_REWARD * (timeMultiplier + stepBonus),
		);

		return {
			amount: finalAmount,
			multiplier: timeMultiplier,
			stepBonus,
		};
	}

	private getTimeMultiplier(minutes: number): number {
		const hours = minutes / 60;

		if (hours < SLEEP_TIME.MIN_HOURS || hours > SLEEP_TIME.MAX_HOURS) return 0;
		if (hours >= SLEEP_TIME.IDEAL_MIN && hours <= SLEEP_TIME.IDEAL_MAX)
			return 2.5;
		if (hours > SLEEP_TIME.IDEAL_MAX) return 1.2;
		if (hours >= 6) return 1.4;

		return 1.0;
	}
}
