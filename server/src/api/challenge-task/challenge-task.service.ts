import { ChallengeStatus, ChallengeTaskStatus } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ChallengeTaskService {
	constructor(private readonly prismaService: PrismaService) {}

	public async recoverChallengeTask(
		userId: string,
		taskId: string,
	): Promise<void> {
		const task = await this.prismaService.challengeTask.findUnique({
			where: { id: taskId, userChallenge: { userId } },
			include: {
				userChallenge: {
					include: {
						user: { select: { id: true, challengeRecoveries: true } },
						challenge: true,
					},
				},
			},
		});

		if (!task)
			throw new NotFoundException(ERROR_MESSAGES.CHALLENGE_TASK.NOT_FOUND);

		if (task.status !== ChallengeTaskStatus.FAILED)
			throw new BadRequestException(
				ERROR_MESSAGES.CHALLENGE_TASK.ONLY_FAILED_TASKS_CAN_BE_RECOVERED,
			);

		if (task.userChallenge.status !== ChallengeStatus.FROZEN)
			throw new BadRequestException(
				ERROR_MESSAGES.CHALLENGE_TASK.RECOVERY_NOT_AVAILABLE,
			);

		if (
			task.userChallenge.usedRecoveries >=
			task.userChallenge.challenge.maxRecoveries
		)
			throw new BadRequestException(
				ERROR_MESSAGES.CHALLENGE_TASK.RECOVERY_LIMIT_REACHED,
			);

		if (task.userChallenge.user.challengeRecoveries <= 0)
			throw new BadRequestException(
				ERROR_MESSAGES.CHALLENGE_TASK.NOT_ENOUGH_RECOVERIES_LEFT,
			);

		await this.prismaService.$transaction(async (tx) => {
			await tx.challengeTask.update({
				where: { id: taskId },
				data: {
					status: ChallengeTaskStatus.RECOVERED,
					completedAt: new Date(),
				},
			});

			await tx.userChallenge.update({
				where: { id: task.userChallenge.id },
				data: {
					usedRecoveries: { increment: 1 },
					status: ChallengeStatus.ACTIVE,
					frozenAt: null,
				},
			});

			await tx.user.update({
				where: { id: userId },
				data: { challengeRecoveries: { decrement: 1 } },
			});
		});
	}
}
