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
import { plainToInstance } from 'class-transformer';
import { ChallengeService } from '../challenge/challenge.service';
import {
	ChallengeTaskDto,
	CreateChallengeTaskDto,
	UpdateChallengeTaskDto,
} from './dto';

@Injectable()
export class ChallengeTaskService {
	constructor(
		private readonly prismaService: PrismaService,
		@Inject(forwardRef(() => ChallengeService))
		private readonly challengeService: ChallengeService,
		private readonly achievementProgressService: AchievementProgressService,
	) {}

	public async createMany(
		challengeId: string,
		userId: string,
		tasks: CreateChallengeTaskDto[],
	): Promise<ChallengeTaskDto[]> {
		const challenge = await this.challengeService.findById(challengeId, userId);

		return await this.prismaService.challengeTask.createManyAndReturn({
			data: tasks.map((task) => ({
				...task,
				isCompleted: false,
				challengeId: challenge.id,
			})),
		});
	}

	public async create(
		challengeId: string,
		userId: string,
		task: CreateChallengeTaskDto,
	): Promise<ChallengeTaskDto> {
		const challenge = await this.challengeService.findById(challengeId, userId);

		return await this.prismaService.challengeTask.create({
			data: {
				...task,
				isCompleted: false,
				challenge: { connect: { id: challenge.id } },
			},
		});
	}

	public async findById(id: string): Promise<ChallengeTaskDto> {
		const task = await this.prismaService.challengeTask.findUnique({
			where: { id },
		});

		if (!task)
			throw new NotFoundException(ERROR_MESSAGES.CHALLENGE_TASK.NOT_FOUND);

		return plainToInstance(ChallengeTaskDto, task);
	}

	public async update(
		challengeId: string,
		taskId: string,
		userId: string,
		data: UpdateChallengeTaskDto,
	): Promise<ChallengeTaskDto> {
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

		return plainToInstance(ChallengeTaskDto, updatedTask);
	}
}
