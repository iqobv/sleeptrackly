import { AchievementProgressService } from '@api/achievement/services';
import { AchievementType } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants';
import {
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { ChallengeService } from '../challenge/challenge.service';
import { CreateChallengeTaskDto, UpdateChallengeTaskDto } from './dto';

@Injectable()
export class ChallengeTaskService {
	constructor(
		private readonly prismaService: PrismaService,
		@Inject(forwardRef(() => ChallengeService))
		private readonly challengeService: ChallengeService,
		private readonly achievementProgressService: AchievementProgressService,
	) {}

	async createMany(
		challengeId: string,
		userId: string,
		tasks: CreateChallengeTaskDto[],
	) {
		const challenge = await this.challengeService.findById(challengeId, userId);

		return await this.prismaService.challengeTask.createMany({
			data: tasks.map((task) => ({
				...task,
				isCompleted: false,
				challengeId: challenge.id,
			})),
		});
	}

	async create(
		challengeId: string,
		userId: string,
		task: CreateChallengeTaskDto,
	) {
		const challenge = await this.challengeService.findById(challengeId, userId);

		return this.prismaService.challengeTask.create({
			data: {
				...task,
				isCompleted: false,
				challenge: { connect: { id: challenge.id } },
			},
		});
	}

	async findById(id: string) {
		const task = await this.prismaService.challengeTask.findUnique({
			where: { id },
		});

		if (!task)
			throw new NotFoundException(ERROR_MESSAGES.CHALLENGE_TASK.NOT_FOUND);

		return task;
	}

	async update(
		challengeId: string,
		taskId: string,
		userId: string,
		data: UpdateChallengeTaskDto,
	) {
		const { isCompleted, completedValue } = data;

		const task = await this.findById(taskId);
		const challenge = await this.challengeService.findById(challengeId, userId);

		const updatedTask = await this.prismaService.challengeTask.update({
			where: { id: task.id, challengeId: challenge.id },
			data: {
				isCompleted,
				completedValue,
			},
		});

		await this.achievementProgressService.checkProgress(
			userId,
			AchievementType.CHALLENGES_TASKS_COMPLETED,
		);

		return updatedTask;
	}
}
