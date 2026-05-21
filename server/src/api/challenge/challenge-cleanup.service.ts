import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ChallengeCleanupService {
	private readonly logger = new Logger(ChallengeCleanupService.name);

	constructor(private readonly prismaService: PrismaService) {}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async cleanup() {
		const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

		try {
			const challenges = await this.prismaService.challenge.deleteMany({
				where: {
					deletedAt: { lte: thirtyDaysAgo },
				},
			});

			this.logger.log(
				`Cleaned up ${challenges.count} challenges deleted before ${thirtyDaysAgo.toISOString()}`,
			);
		} catch (error) {
			this.logger.error(
				`Failed to clean up challenges deleted before ${thirtyDaysAgo.toISOString()}`,
				error instanceof Error ? error.stack : undefined,
			);
			return;
		}
	}
}
