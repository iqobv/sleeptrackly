import { AchievementProgressService } from '@api/achievement/services/achievement-progress.service';
import { CreateChallengeTaskDto } from '@api/challenge-task/dto/create-challenge-task.dto';
import { AchievementType } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { getDateRanges } from '@libs/utils/date-ranges.util';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { plainToInstance } from 'class-transformer';
import dayjs from 'dayjs';
import { ChallengeDto, ChallengeFullDto } from './dto/challenge.dto';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Injectable()
export class ChallengeService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly achievementProgressService: AchievementProgressService,
	) {}

	public async create(
		userId: string,
		dto: CreateChallengeDto,
	): Promise<ChallengeDto> {
		const { endDate, frequency, startDate, tasksOptions, ...rest } = dto;
		const nowDate = dayjs().toDate();

		if (dayjs(startDate).isBefore(nowDate))
			throw new BadRequestException(ERROR_MESSAGES.CHALLENGE.START_DATE_PAST);

		if (dayjs(endDate).isBefore(nowDate))
			throw new BadRequestException(ERROR_MESSAGES.CHALLENGE.END_DATE_PAST);

		if (dayjs(endDate).isBefore(dayjs(startDate)))
			throw new BadRequestException(
				ERROR_MESSAGES.CHALLENGE.INVALID_DATE_RANGE,
			);

		const dates = getDateRanges(
			new Date(startDate).toISOString(),
			new Date(endDate).toISOString(),
			frequency,
		);

		const tasks: Omit<CreateChallengeTaskDto, 'challengeId'>[] = [];
		let targetValue = tasksOptions.value;

		dates.forEach(({ startDate, endDate }) => {
			tasks.push({
				startDate: new Date(startDate),
				endDate: new Date(endDate),
				description: tasksOptions.description,
				targetValue:
					tasksOptions.increment !== null ? targetValue : tasksOptions.value,
			});
			targetValue += tasksOptions.increment;
		});

		const challenge = await this.prismaService.challenge.create({
			data: {
				...rest,
				frequency,
				startDate,
				endDate,
				isCompleted: false,
				isStarted: false,
				user: { connect: { id: userId } },
				tasks: {
					createMany: {
						data: tasks.map((task) => ({ ...task, isCompleted: false })),
					},
				},
			},
		});

		return plainToInstance(ChallengeDto, challenge);
	}

	public async findById(id: string, userId: string): Promise<ChallengeFullDto> {
		const challenge = await this.prismaService.challenge.findUnique({
			where: { id, userId, deletedAt: null },
			include: { tasks: true },
		});

		if (!challenge)
			throw new NotFoundException(ERROR_MESSAGES.CHALLENGE.NOT_FOUND);

		return plainToInstance(ChallengeFullDto, challenge);
	}

	public async findAll(userId: string): Promise<ChallengeDto[]> {
		const challenges = await this.prismaService.challenge.findMany({
			where: { userId, deletedAt: null },
		});

		return plainToInstance(ChallengeDto, challenges);
	}

	public async update(
		id: string,
		userId: string,
		dto: UpdateChallengeDto,
	): Promise<ChallengeDto> {
		const challenge = await this.findById(id, userId);

		const updated = await this.prismaService.challenge.update({
			where: { id: challenge.id, userId },
			data: dto,
		});

		return plainToInstance(ChallengeDto, updated);
	}

	@Cron(CronExpression.EVERY_5_MINUTES)
	private async updateChallengeStatuses(): Promise<void> {
		const nowDate = dayjs().toDate();

		await this.prismaService.challenge.updateMany({
			where: {
				isStarted: false,
				isCompleted: false,
				deletedAt: null,
				startDate: { lte: nowDate },
				endDate: { gt: nowDate },
			},
			data: { isStarted: true },
		});

		const newlyCompletedChallenges =
			await this.prismaService.challenge.findMany({
				where: {
					isCompleted: false,
					deletedAt: null,
					NOT: { tasks: { none: {} } },
					tasks: { every: { isCompleted: true } },
				},
				select: { id: true, userId: true },
			});

		if (newlyCompletedChallenges.length === 0) return;

		const completedIds = newlyCompletedChallenges.map((c) => c.id);
		await this.prismaService.challenge.updateMany({
			where: { id: { in: completedIds } },
			data: { isStarted: false, isCompleted: true },
		});

		for (const challenge of newlyCompletedChallenges) {
			await this.achievementProgressService.checkProgress(
				challenge.userId,
				AchievementType.CHALLENGES_COMPLETED,
			);
		}
	}

	public async remove(id: string, userId: string): Promise<MessageResponse> {
		const challenge = await this.findById(id, userId);

		await this.prismaService.challenge.update({
			where: { id: challenge.id, userId },
			data: { deletedAt: new Date() },
		});

		return SUCCESS_MESSAGES.CHALLENGE.DELETED;
	}
}
