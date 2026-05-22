import { WeeklySummaryService } from '@api/weekly-summary/weekly-summary.service';
import { Prisma, SleepEntry } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import dayjs from 'dayjs';
import { RewardService } from '../reward/reward.service';
import { UpdateUserSleepStatusDto } from './dto';

@Injectable()
export class UserSleepStatusService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly rewardService: RewardService,
		private readonly weeklySummaryService: WeeklySummaryService,
	) {}

	async getSleepStatus(userId: string) {
		const userSleepStatus = await this.prismaService.userSleepStatus.findUnique(
			{ where: { userId } },
		);

		return userSleepStatus;
	}

	async createSleepStatus(userId: string, tx: Prisma.TransactionClient) {
		return await (tx || this.prismaService).userSleepStatus.create({
			data: { userId },
		});
	}

	private calculateSleepDuration(start: Date, end: Date) {
		const sleepEndDate = dayjs(end).toDate();
		const sleepDuration = dayjs(sleepEndDate).diff(start, 'second');
		const dateForChart = dayjs(sleepEndDate)
			.startOf('day')
			.format('YYYY-MM-DD');
		return { sleepDuration, dateForChart };
	}

	private async createSleepEntry(
		userId: string,
		sleepStart: Date,
		sleepEnd: Date,
		sleepDuration: number,
		dateForChart: string,
		tx?: Prisma.TransactionClient,
	) {
		const prisma = tx ?? this.prismaService;

		return await prisma.sleepEntry.create({
			data: {
				userId,
				sleepStart: new Date(sleepStart),
				sleepEnd: new Date(sleepEnd),
				sleepDuration,
				dateForChart,
			},
		});
	}

	private async handleWakeUp(
		userId: string,
		sleepStart: Date,
		clickedAt: Date,
		dateForChart?: string,
	) {
		const { sleepDuration, dateForChart: generatedDateForChart } =
			this.calculateSleepDuration(sleepStart, clickedAt);

		return await this.prismaService.$transaction(async (tx) => {
			const sleepEntry = await this.createSleepEntry(
				userId,
				sleepStart,
				clickedAt,
				sleepDuration,
				dateForChart || generatedDateForChart,
				tx,
			);

			const reward = await this.rewardService.rewardForSleep(
				userId,
				sleepEntry.id,
				Math.floor(sleepDuration / 60),
				tx,
			);
			return { sleepEntry, isSleeping: false, sleepStart: null, reward };
		});
	}

	private handleSleepStart(clickedAt: Date) {
		return {
			isSleeping: true,
			sleepStart: new Date(clickedAt),
			sleepEntry: {},
		};
	}

	private async updateUserSleepStatus(
		userId: string,
		isSleeping: boolean,
		sleepStart: Date | null,
	) {
		return await this.prismaService.userSleepStatus.update({
			where: { userId },
			data: { isSleeping, sleepStart },
		});
	}

	async updateSleepStatus(userId: string, dto: UpdateUserSleepStatusDto) {
		const serverNow = new Date();

		const { dateForChart } = dto;

		let userSleepStatus = await this.getSleepStatus(userId);
		if (!userSleepStatus) throw new NotFoundException('User not found');

		let { isSleeping, sleepStart } = userSleepStatus;
		let sleepEntry: SleepEntry | null;
		let reward: { rewarded: boolean; amount: number } | null = null;

		if (isSleeping && sleepStart) {
			const result = await this.handleWakeUp(
				userId,
				sleepStart,
				serverNow,
				dateForChart,
			);
			sleepEntry = result.sleepEntry;
			isSleeping = result.isSleeping;
			sleepStart = result.sleepStart;
			reward = result.reward;
		} else {
			const result = this.handleSleepStart(serverNow);
			sleepEntry = null;
			isSleeping = result.isSleeping;
			sleepStart = result.sleepStart;
		}

		userSleepStatus = await this.updateUserSleepStatus(
			userId,
			isSleeping,
			sleepStart,
		);

		if (sleepEntry && dateForChart) {
			this.weeklySummaryService
				.generateSummaryForPreviousWeek(userId, dateForChart)
				.catch((error) => {
					console.error('Error generating weekly summary:', error);
				});
		}

		return { userSleepStatus, sleepEntry, reward };
	}
}
