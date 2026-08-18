import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class UserChallengeRecoveryCronService {
	private readonly logger = new Logger(UserChallengeRecoveryCronService.name);

	constructor(private readonly prismaService: PrismaService) {}

	@Cron('0 3 * * 0')
	public async handleCalculateChallengeRecoveries(): Promise<void> {
		this.logger.log('Starting challenge recoveries distribution...');

		const now = new Date();
		const bufferThreshold = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);

		const timeCondition = {
			OR: [
				{ challengeRecoveriesUpdatedAt: { lt: bufferThreshold } },
				{ challengeRecoveriesUpdatedAt: null },
			],
		};

		try {
			await this.prismaService.$transaction([
				this.prismaService.user.updateMany({
					where: {
						...timeCondition,
						challengeRecoveries: 2,
					},
					data: {
						challengeRecoveries: 3,
						challengeRecoveriesUpdatedAt: now,
					},
				}),
				this.prismaService.user.updateMany({
					where: {
						...timeCondition,
						challengeRecoveries: { lt: 2 },
					},
					data: {
						challengeRecoveries: 2,
						challengeRecoveriesUpdatedAt: now,
					},
				}),
				this.prismaService.user.updateMany({
					where: {
						...timeCondition,
						challengeRecoveries: { gte: 3 },
					},
					data: {
						challengeRecoveries: 3,
						challengeRecoveriesUpdatedAt: now,
					},
				}),
			]);

			this.logger.log('Successfully distributed challenge recoveries.');
		} catch (error) {
			this.logger.error('Failed to distribute challenge recoveries', error);
		}
	}
}
