import { AchievementsPublisherService } from '@api/achievement/services/achievements-publisher.service';
import { ChallengePublisherService } from '@api/challenge/services/challenge-publisher.service';
import { SleepReward } from '@api/reward/interfaces/sleep-reward.interface';
import { RewardService } from '@api/reward/services/reward.service';
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
	private readonly TOLERANCE_MS = 120 * 1000;
	private readonly MIN_DURATION_MS = 3 * 60 * 60 * 1000;

	constructor(
		private readonly prismaService: PrismaService,
		private readonly rewardService: RewardService,
		private readonly sleepEntryService: SleepEntryService,
		private readonly achievementPublisherService: AchievementsPublisherService,
		private readonly challengePublisherService: ChallengePublisherService,
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
		tx?: Prisma.TransactionClient,
	): Promise<UserSleepStatusDto> {
		const prisma = tx ?? this.prismaService;

		return await prisma.userSleepStatus.create({
			data: { userId },
		});
	}

	public async resetSleepStatus(userId: string): Promise<void> {
		await this.prismaService.userSleepStatus.update({
			where: { userId },
			data: { isSleeping: false, sleepStart: null, sleepEnd: null },
		});
	}

	public async stopTimer(userId: string): Promise<UserSleepStatusDto> {
		const updated = await this.prismaService.userSleepStatus.update({
			where: { userId },
			data: { sleepEnd: new Date() },
		});

		return plainToInstance(UserSleepStatusDto, updated);
	}

	public async resumeTimer(userId: string): Promise<UserSleepStatusDto> {
		const updated = await this.prismaService.userSleepStatus.update({
			where: { userId },
			data: { sleepEnd: null },
		});

		return plainToInstance(UserSleepStatusDto, updated);
	}

	public async updateSleepStatus(
		userId: string,
		dto: UpdateUserSleepStatusDto,
	): Promise<UpdatedSleepStatusDto> {
		const serverNow = new Date();
		const userSleepStatus = await this.getSleepStatus(userId);

		const {
			dateForChart,
			isEdited,
			rating,
			sleepEnd,
			sleepStart: dtoSleepStart,
			timezone,
		} = dto;

		if (!userSleepStatus) {
			throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND);
		}

		let isSleeping = userSleepStatus.isSleeping;
		let sleepStart = userSleepStatus.sleepStart;
		let sleepEntry: SleepEntry | null = null;
		let reward: UpdatedSleepRewardDto | null = null;

		if (isSleeping && sleepStart) {
			const serverStart = sleepStart;
			const serverEnd = userSleepStatus.sleepEnd ?? serverNow;
			const clientStart = dtoSleepStart ?? serverStart;
			const clientEnd = sleepEnd ?? serverEnd;

			if (clientStart.getTime() >= clientEnd.getTime()) {
				throw new BadRequestException(
					ERROR_MESSAGES.SLEEP_ENTRY.INVALID_TIME_RANGE,
				);
			}

			const isVerified = this.verifySleepSession(
				serverStart,
				serverEnd,
				clientStart,
				clientEnd,
				isEdited,
			);

			const finalTimezone = timezone ?? (await this.getUserTimezone(userId));

			const result = await this.handleWakeUp({
				userId,
				sleepStart: clientStart,
				clickedAt: clientEnd,
				dateForChart,
				rating: rating ?? 0,
				isVerified,
				timezone: finalTimezone,
			});

			sleepEntry = result.sleepEntry;
			isSleeping = result.isSleeping;
			sleepStart = result.sleepStart;
			reward = result.reward;
		} else {
			const result = this.handleSleepStart(dto.sleepStart ?? serverNow);
			isSleeping = result.isSleeping;
			sleepStart = result.sleepStart;
		}

		const updatedStatus = await this.updateUserSleepStatus(
			userId,
			isSleeping,
			sleepStart,
		);

		return plainToInstance(UpdatedSleepStatusDto, {
			userSleepStatus: updatedStatus,
			sleepEntry,
			reward,
		});
	}

	private async handleWakeUp(args: WakeUpArgs): Promise<SleepEnd> {
		const {
			clickedAt,
			rating,
			sleepStart,
			userId,
			dateForChart,
			isVerified,
			timezone,
		} = args;

		const { dateForChart: generatedDateForChart } = calculateSleepDuration(
			sleepStart,
			clickedAt,
		);

		return await this.prismaService.$transaction(async (tx) => {
			const finalDateForChart = dateForChart ?? generatedDateForChart;

			const sleepEntry = await this.sleepEntryService.createSleepEntry(
				userId,
				{
					sleepStart: sleepStart,
					sleepEnd: clickedAt,
					dateForChart: finalDateForChart,
					rating,
					timezone,
					isVerified,
				},
				tx,
			);

			let reward: SleepReward = { amount: 0, rewarded: false };

			if (isVerified) {
				reward = await this.rewardService.rewardForSleep(
					userId,
					sleepEntry.id,
					Math.floor(sleepEntry.sleepDuration / 60),
					tx,
				);

				await this.achievementPublisherService.dispatchProgressCheck({
					type: AchievementType.SLEEP_COUNT,
					userId,
				});

				await this.challengePublisherService.dispatchProgressCheck({
					userId,
					sleepEntryId: sleepEntry.id,
				});
			}

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
			data: {
				isSleeping,
				sleepStart,
				sleepEnd: isSleeping ? undefined : null,
			},
		});

		return plainToInstance(UserSleepStatusDto, updated);
	}

	private verifySleepSession(
		serverStart: Date,
		serverEnd: Date,
		clientStart: Date,
		clientEnd: Date,
		isEdited?: boolean,
	): boolean {
		if (isEdited) return false;

		const startDiff = Math.abs(clientStart.getTime() - serverStart.getTime());
		if (startDiff > this.TOLERANCE_MS) return false;

		const endDiff = Math.abs(clientEnd.getTime() - serverEnd.getTime());
		if (endDiff > this.TOLERANCE_MS) return false;

		const durationMs = clientEnd.getTime() - clientStart.getTime();
		if (durationMs < this.MIN_DURATION_MS) return false;

		return true;
	}

	private async getUserTimezone(userId: string): Promise<string> {
		const user = await this.prismaService.user.findUnique({
			where: { id: userId, deletedAt: null },
			select: { timezone: true },
		});

		return user?.timezone ?? 'UTC';
	}
}
