import {
	ACHIEVEMENT_CHECK_EVENT,
	AchievementCheckEvent,
} from '@api/achievement/events/achievement-progress.event';
import { SleepReward } from '@api/reward/interfaces/sleep-reward.interface';
import { RewardService } from '@api/reward/reward.service';
import { SleepEntryService } from '@api/sleep-entry/sleep-entry.service';
import { AchievementType, Prisma, SleepEntry } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { calculateSleepDuration } from '@libs/utils/calculate-sleep-duration.util';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
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
		private readonly sleepEntryService: SleepEntryService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	public async getSleepStatus(
		userId: string,
	): Promise<UserSleepStatusDto | null> {
		const userSleepStatus = await this.prismaService.userSleepStatus.findUnique(
			{
				where: { userId },
			},
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
		const { clickedAt, rating, sleepStart, userId, dateForChart, isEdited } =
			args;

		const { dateForChart: generatedDateForChart } = calculateSleepDuration(
			sleepStart,
			clickedAt,
		);

		return await this.prismaService.$transaction(async (tx) => {
			const finaldateForChart = dateForChart ?? generatedDateForChart;

			const sleepEntry = await this.sleepEntryService.createSleepEntry(
				userId,
				{
					sleepStart: sleepStart,
					sleepEnd: clickedAt,
					dateForChart: finaldateForChart,
					rating: rating ?? 0,
				},
				tx,
			);

			const reward: SleepReward = isEdited
				? { amount: 0, rewarded: false }
				: await this.rewardService.rewardForSleep(
						userId,
						sleepEntry.id,
						Math.floor(sleepEntry.sleepDuration / 60),
						tx,
					);

			this.eventEmitter.emit(
				ACHIEVEMENT_CHECK_EVENT,
				new AchievementCheckEvent({
					userId,
					type: AchievementType.SLEEP_COUNT,
				}),
			);

			return {
				sleepEntry,
				isSleeping: false,
				sleepStart: null,
				reward,
			};
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

		const {
			dateForChart,
			rating,
			sleepEnd,
			sleepStart: customSleepStart,
		} = dto;

		let userSleepStatus = await this.getSleepStatus(userId);
		if (!userSleepStatus) {
			throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND);
		}

		let { isSleeping, sleepStart } = userSleepStatus;
		let sleepEntry: SleepEntry | null;
		let reward: UpdatedSleepRewardDto | null = null;

		if (isSleeping && sleepStart) {
			const finalSleepStart = customSleepStart ?? sleepStart;
			const finalSleepEnd = sleepEnd ?? serverNow;

			if (finalSleepStart.getTime() >= finalSleepEnd.getTime())
				throw new BadRequestException(
					ERROR_MESSAGES.SLEEP_ENTRY.INVALID_TIME_RANGE,
				);

			const timeDiffHours =
				Math.abs(serverNow.getTime() - finalSleepEnd.getTime()) /
				(1000 * 60 * 60);

			const isEdited = Boolean(
				customSleepStart || dto.isEdited || timeDiffHours > 2,
			);

			const result = await this.handleWakeUp({
				userId,
				sleepStart: finalSleepStart,
				clickedAt: finalSleepEnd,
				dateForChart,
				rating: rating ?? 0,
				isEdited,
			});

			sleepEntry = result.sleepEntry;
			isSleeping = result.isSleeping;
			sleepStart = result.sleepStart;
			reward = result.reward;
		} else {
			const result = this.handleSleepStart(customSleepStart ?? serverNow);
			sleepEntry = null;
			isSleeping = result.isSleeping;
			sleepStart = result.sleepStart;
		}

		userSleepStatus = await this.updateUserSleepStatus(
			userId,
			isSleeping,
			sleepStart,
		);

		return plainToInstance(UpdatedSleepStatusDto, {
			userSleepStatus,
			sleepEntry,
			reward,
		});
	}
}
