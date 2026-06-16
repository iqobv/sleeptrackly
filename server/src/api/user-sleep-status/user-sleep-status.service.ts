import {
	ACHIEVEMENT_CHECK_EVENT,
	AchievementCheckEvent,
} from '@api/achievement/events/achievement-progress.event';
import { RewardService } from '@api/reward/reward.service';
import {
	SLEEP_RECORDED_EVENT,
	SleepRecordedEvent,
} from '@api/weekly-summary/events/sleep-ended.event';
import { AchievementType, Prisma, SleepEntry } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { calculateSleepDuration } from '@libs/utils/calculate-sleep-duration.util';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { plainToInstance } from 'class-transformer';
import { UserSleepStatusDto } from './dto/sleep-status.dto';
import { UpdateUserSleepStatusDto } from './dto/update-sleep-status.dto';
import {
	UpdatedSleepRewardDto,
	UpdatedSleepStatusDto,
} from './dto/updated-sleep-status.dto';
import { SleepEnd } from './interfaces/sleep-end.interface';
import { SleepStart } from './interfaces/sleep-start.interface';
import { WakeUpArgs } from './interfaces/wake-up-args.interface';

@Injectable()
export class UserSleepStatusService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly rewardService: RewardService,
		private readonly eventEmitter: EventEmitter2,
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

	private async handleWakeUp(args: WakeUpArgs): Promise<SleepEnd> {
		const { clickedAt, rating, sleepStart, userId, dateForChart } = args;

		const { sleepDuration, dateForChart: generatedDateForChart } =
			calculateSleepDuration(sleepStart, clickedAt);

		return await this.prismaService.$transaction(async (tx) => {
			const sleepEntry = await tx.sleepEntry.create({
				data: {
					sleepStart: new Date(sleepStart),
					sleepEnd: new Date(clickedAt),
					sleepDuration,
					dateForChart: dateForChart ?? generatedDateForChart,
					rating,
					user: { connect: { id: userId } },
				},
			});

			const reward = await this.rewardService.rewardForSleep(
				userId,
				sleepEntry.id,
				Math.floor(sleepDuration / 60),
				tx,
			);

			this.eventEmitter.emit(
				ACHIEVEMENT_CHECK_EVENT,
				new AchievementCheckEvent({
					userId,
					type: AchievementType.SLEEP_COUNT,
				}),
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

		const { dateForChart, rating } = dto;

		let userSleepStatus = await this.getSleepStatus(userId);
		if (!userSleepStatus)
			throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND);

		let { isSleeping, sleepStart } = userSleepStatus;
		let sleepEntry: SleepEntry | null;
		let reward: UpdatedSleepRewardDto | null = null;

		if (isSleeping && sleepStart) {
			const result = await this.handleWakeUp({
				userId,
				sleepStart,
				clickedAt: serverNow,
				dateForChart,
				rating: rating ?? 0,
			});
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
			this.eventEmitter.emit(
				SLEEP_RECORDED_EVENT,
				new SleepRecordedEvent({
					userId,
					dateForChart,
				}),
			);
		}

		const result = { userSleepStatus, sleepEntry, reward };

		return plainToInstance(UpdatedSleepStatusDto, result);
	}
}
