import { AchievementProgressService } from '@api/achievement/services';
import { AchievementType } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { MessageResponse } from '@libs/types';
import { getDateRanges } from '@libs/utils';
import {
	BadRequestException,
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { plainToInstance } from 'class-transformer';
import dayjs from 'dayjs';
import { ChallengeTaskService } from '../challenge-task/challenge-task.service';
import { CreateChallengeTaskDto } from '../challenge-task/dto';
import {
	ChallengeDto,
	ChallengeFullDto,
	CreateChallengeDto,
	UpdateChallengeDto,
} from './dto';

@Injectable()
export class ChallengeService {
	constructor(
		private readonly prismaService: PrismaService,
		@Inject(forwardRef(() => ChallengeTaskService))
		private readonly challengeTaskService: ChallengeTaskService,
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

		const challenge = await this.prismaService.challenge.create({
			data: {
				...rest,
				frequency,
				startDate,
				endDate,
				isCompleted: false,
				isStarted: false,
				user: { connect: { id: userId } },
			},
		});

		const tasks: CreateChallengeTaskDto[] = [];

		const dates = getDateRanges(
			new Date(startDate).toISOString(),
			new Date(endDate).toISOString(),
			frequency,
		);

		let targetValue = tasksOptions.value;

		dates.map(({ startDate, endDate }) => {
			tasks.push({
				startDate: new Date(startDate),
				endDate: new Date(endDate),
				description: tasksOptions.description,
				targetValue:
					tasksOptions.increment !== null ? targetValue : tasksOptions.value,
			});
			targetValue += tasksOptions.increment;
		});

		await this.challengeTaskService.createMany(challenge.id, userId, tasks);

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

		const challenges = await this.prismaService.challenge.findMany({
			include: { tasks: true },
		});

		for (const challenge of challenges) {
			const startDate = dayjs(challenge.startDate).toDate();
			const endDate = dayjs(challenge.endDate).toDate();

			if (
				(!challenge.isStarted &&
					!challenge.isCompleted &&
					nowDate.getTime() === startDate.getTime()) ||
				(nowDate.getTime() > startDate.getTime() &&
					nowDate.getTime() < endDate.getTime())
			) {
				challenge.isStarted = true;
			}

			const completedTasks = challenge.tasks.filter((task) => task.isCompleted);

			if (completedTasks.length === challenge.tasks.length) {
				challenge.isStarted = false;
				challenge.isCompleted = true;

				await this.achievementProgressService.checkProgress(
					challenge.userId,
					AchievementType.CHALLENGES_COMPLETED,
				);
			}

			await this.prismaService.challenge.update({
				where: { id: challenge.id },
				data: {
					isStarted: challenge.isStarted,
					isCompleted: challenge.isCompleted,
				},
			});
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
