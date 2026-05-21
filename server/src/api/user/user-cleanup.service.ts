import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UserCleanupService {
	private readonly logger = new Logger(UserCleanupService.name);

	constructor(private readonly prismaService: PrismaService) {}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async cleanup() {
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

		try {
			const deletedUsers = await this.prismaService.user.deleteMany({
				where: {
					deletedAt: {
						lte: thirtyDaysAgo
					}
				}
			})

			this.logger.log(`Cleaned up ${deletedUsers.count} deleted users`);
		} catch (error) {
			this.logger.error('Failed to clean up deleted users', error);
			return;
		}
	}
}
