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
						lte: thirtyDaysAgo,
					},
				},
			});

			this.logger.log(`Cleaned up ${deletedUsers.count} deleted users`);
		} catch (error) {
			this.logger.error('Failed to clean up deleted users', error);
			return;
		}
	}

	async removeUnverifiedUsersOlderThan(milliseconds: number) {
		const cutoffDate = new Date(Date.now() - milliseconds);

		const usersToRemove = await this.prismaService.user.findMany({
			where: {
				emailVerified: false,
				createdAt: { lt: cutoffDate },
			},
			select: { id: true },
		});

		const userIds = usersToRemove.map((user) => user.id);

		await this.prismaService.user.deleteMany({
			where: { id: { in: userIds } },
		});

		return true;
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async handleRemoveUnverifiedUsersOlderThan() {
		return await this.removeUnverifiedUsersOlderThan(24 * 60 * 60 * 1000);
	}
}
