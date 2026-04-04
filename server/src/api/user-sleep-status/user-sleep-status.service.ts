import { Injectable, NotFoundException } from '@nestjs/common';
import dayjs from 'dayjs';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { RewardService } from '../reward/reward.service';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class UserSleepStatusService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly rewardService: RewardService,
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
	) {
		return this.prismaService.sleepEntry.create({
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
		clickedBy: Date,
	) {
		const { sleepDuration, dateForChart } = this.calculateSleepDuration(
			sleepStart,
			clickedBy,
		);

		const sleepEntry = await this.createSleepEntry(
			userId,
			sleepStart,
			clickedBy,
			sleepDuration,
			dateForChart,
		);

		const reward = await this.rewardService.rewardForSleep(
			userId,
			sleepEntry.id,
			Math.floor(sleepDuration / 60),
		);

		return { sleepEntry, isSleeping: false, sleepStart: null, reward };
	}

	private handleSleepStart(clickedBy: Date) {
		return {
			isSleeping: true,
			sleepStart: new Date(clickedBy),
			sleepEntry: {},
		};
	}

	private async updateUserSleepStatus(
		userId: string,
		isSleeping: boolean,
		sleepStart: Date | null,
	) {
		return this.prismaService.userSleepStatus.update({
			where: { userId },
			data: { isSleeping, sleepStart },
		});
	}

	async updateSleepStatus(userId: string, clickedBy: Date) {
		let userSleepStatus = await this.getSleepStatus(userId);
		if (!userSleepStatus) throw new NotFoundException('User not found');

		let { isSleeping, sleepStart } = userSleepStatus;
		let sleepEntry = {};
		let reward: { rewarded: boolean; amount: number } | null = null;

		if (isSleeping && sleepStart) {
			const result = await this.handleWakeUp(userId, sleepStart, clickedBy);
			sleepEntry = result.sleepEntry;
			isSleeping = result.isSleeping;
			sleepStart = result.sleepStart;
			reward = result.reward;
		} else {
			const result = this.handleSleepStart(clickedBy);
			sleepEntry = result.sleepEntry;
			isSleeping = result.isSleeping;
			sleepStart = result.sleepStart;
			reward = null;
		}

		userSleepStatus = await this.updateUserSleepStatus(
			userId,
			isSleeping,
			sleepStart,
		);

		return { userSleepStatus, sleepEntry, reward };
	}
}
