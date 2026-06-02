import { AchievementProgressService } from '@api/achievement/services';
import { WeeklySummaryService } from '@api/weekly-summary/weekly-summary.service';
import { AchievementType, Prisma, SleepEntry } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import dayjs from 'dayjs';
import { RewardService } from '../reward/reward.service';
import {
	UpdatedSleepRewardDto,
	UpdatedSleepStatusDto,
	UpdateUserSleepStatusDto,
	UserSleepStatusDto,
} from './dto';
import { CalculatedSleepDuration, SleepStart } from './interfaces';
import { SleepEnd } from './interfaces/sleep-end.interface';

@Injectable()
export class UserSleepStatusService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly rewardService: RewardService,
		private readonly weeklySummaryService: WeeklySummaryService,
		private readonly achievementProgressService: AchievementProgressService,
	) {}

	public async getSleepStatus(
		userId: string,
	): Promise<UserSleepStatusDto | null> {
		const userSleepStatus = await this.prismaService.userSleepStatus.findUnique(
			{ where: { userId } },
		);

		return userSleepStatus
			? plainToInstance(UserSleepStatusDto, userSleepStatus)
			: null;
	}

	public async createSleepStatus(
		userId: string,
		tx: Prisma.TransactionClient,
	): Promise<UserSleepStatusDto> {
		const prisma = tx ?? this.prismaService;

		return await prisma.userSleepStatus.create({
			data: { userId },
		});
	}

	private calculateSleepDuration(
		start: Date,
		end: Date,
	): CalculatedSleepDuration {
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
	): Promise<SleepEntry> {
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
	): Promise<SleepEnd> {
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

			await this.achievementProgressService.checkProgress(
				userId,
				AchievementType.SLEEP_COUNT,
				tx,
			);

			return { sleepEntry, isSleeping: false, sleepStart: null, reward };
		});
	}

	private handleSleepStart(clickedAt: Date): SleepStart {
		return {
			isSleeping: true,
			sleepStart: new Date(clickedAt),
			sleepEntry: null,
		};
	}

	private async updateUserSleepStatus(
		userId: string,
		isSleeping: boolean,
		sleepStart: Date | null,
	): Promise<UserSleepStatusDto> {
		const updated = await this.prismaService.userSleepStatus.update({
			where: { userId },
			data: { isSleeping, sleepStart },
		});

		return plainToInstance(UserSleepStatusDto, updated);
	}

	public async updateSleepStatus(
		userId: string,
		dto: UpdateUserSleepStatusDto,
	): Promise<UpdatedSleepStatusDto> {
		const serverNow = new Date();

		const { dateForChart } = dto;

		let userSleepStatus = await this.getSleepStatus(userId);
		if (!userSleepStatus)
			throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND);

		let { isSleeping, sleepStart } = userSleepStatus;
		let sleepEntry: SleepEntry | null;
		let reward: UpdatedSleepRewardDto | null = null;

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

		const result = { userSleepStatus, sleepEntry, reward };

		return plainToInstance(UpdatedSleepStatusDto, result);
	}
}
