import {
	ACHIEVEMENT_CHECK_EVENT,
	AchievementCheckEvent,
} from '@api/achievement/events/achievement-progress.event';
import { AchievementType } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { plainToInstance } from 'class-transformer';
import { ChallengeTaskDto } from './dto/challenge-task.dto';
import { CreateChallengeTaskDto } from './dto/create-challenge-task.dto';
import { UpdateChallengeTaskDto } from './dto/update-challenge-task.dto';

@Injectable()
export class ChallengeTaskService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	public async createMany(
		challengeId: string,
		userId: string,
		tasks: CreateChallengeTaskDto[],
	): Promise<ChallengeTaskDto[]> {
		await this.ensureChallengeOwnership(challengeId, userId);

		return await this.prismaService.challengeTask.createManyAndReturn({
			data: tasks.map((task) => ({
				...task,
				isCompleted: false,
				challengeId,
			})),
		});
	}

	public async create(
		challengeId: string,
		userId: string,
		task: CreateChallengeTaskDto,
	): Promise<ChallengeTaskDto> {
		await this.ensureChallengeOwnership(challengeId, userId);

		const newTask = await this.prismaService.challengeTask.create({
			data: {
				...task,
				isCompleted: false,
				challenge: { connect: { id: challengeId } },
			},
		});

		return plainToInstance(ChallengeTaskDto, newTask);
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

		await this.ensureChallengeOwnership(challengeId, userId);

		const updatedTask = await this.prismaService.challengeTask.update({
			where: { id: taskId, challengeId },
			data: {
				isCompleted,
				completedValue,
			},
		});

		this.eventEmitter.emit(
			ACHIEVEMENT_CHECK_EVENT,
			new AchievementCheckEvent({
				userId,
				type: AchievementType.CHALLENGES_TASKS_COMPLETED,
			}),
		);

		return plainToInstance(ChallengeTaskDto, updatedTask);
	}

	private async ensureChallengeOwnership(
		challengeId: string,
		userId: string,
	): Promise<void> {
		const challenge = await this.prismaService.challenge.findUnique({
			where: { id: challengeId, userId, deletedAt: null },
			select: { id: true },
		});

		if (!challenge) {
			throw new NotFoundException(ERROR_MESSAGES.CHALLENGE.NOT_FOUND);
		}
	}
}
