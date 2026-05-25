import { AchievementProgressService } from '@api/achievement/services';
import { AchievementType } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { getDateRanges } from '@libs/utils';
import {
	BadRequestException,
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import dayjs from 'dayjs';
import { ChallengeTaskService } from '../challenge-task/challenge-task.service';
import { CreateChallengeTaskDto } from '../challenge-task/dto';
import { CreateChallengeDto, UpdateChallengeDto } from './dto';

@Injectable()
export class ChallengeService {
	constructor(
		private readonly prismaService: PrismaService,
		@Inject(forwardRef(() => ChallengeTaskService))
		private readonly challengeTaskService: ChallengeTaskService,
		private readonly achievementProgressService: AchievementProgressService,
	) {}

	async create(userId: string, dto: CreateChallengeDto) {
		const { endDate, description, title, frequency, startDate, tasksOptions } =
			dto;

		const nowDate = dayjs().toDate();

		if (dayjs(startDate).isBefore(nowDate))
			throw new BadRequestException('Start date cannot be in the past');

		if (dayjs(endDate).isBefore(nowDate))
			throw new BadRequestException('End date cannot be in the past');

		if (dayjs(endDate).isBefore(dayjs(startDate)))
			throw new BadRequestException('End date cannot be before start date');

		const challenge = await this.prismaService.challenge.create({
			data: {
				title,
				description,
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

		return challenge;
	}

	async findById(id: string, userId: string) {
		const challenge = await this.prismaService.challenge.findUnique({
			where: { id, userId, deletedAt: null },
			include: { tasks: true },
		});

		if (!challenge) throw new NotFoundException('Challenge not found');

		return challenge;
	}

	async findAll(userId: string) {
		return await this.prismaService.challenge.findMany({
			where: { userId, deletedAt: null },
		});
	}

	async update(id: string, userId: string, dto: UpdateChallengeDto) {
		const { title, description, isStarted, isCompleted } = dto;

		const challenge = await this.findById(id, userId);

		return await this.prismaService.challenge.update({
			where: { id: challenge.id, userId },
			data: { title, description, isStarted, isCompleted },
		});
	}

	@Cron(CronExpression.EVERY_5_MINUTES)
	async updateChallengeStatuses() {
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

	async remove(id: string, userId: string) {
		const challenge = await this.findById(id, userId);

		await this.prismaService.challenge.update({
			where: { id: challenge.id, userId },
			data: { deletedAt: new Date() },
		});

		return { message: 'Challenge removed successfully' };
	}
}
