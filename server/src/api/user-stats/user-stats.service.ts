import { StreakService } from '@api/streak/streak.service';
import { Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { userSelect } from '@libs/prisma/user.select.prisma';
import { getNextMondayUTC } from '@libs/utils/get-next-monday-utc.util';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { UserStatsDto } from './dto/user-stats.dto';
import { GetChallengeRestoresUpdatesResponse } from './interfaces/get-challenge-restores-updates.interface';
import { GetStreakUpdatesResponse } from './interfaces/get-streak-updates.interface';

dayjs.extend(utc);
dayjs.extend(timezone);

type UserStats = Prisma.UserStatsGetPayload<typeof userSelect.userStats>;

@Injectable()
export class UserStatsService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly streakService: StreakService,
	) {}

	public async getUserStats(userId: string): Promise<UserStatsDto> {
		const stats = await this.prismaService.userStats.findUnique({
			where: { userId },
			include: { activeStreak: true },
		});

		if (!stats) {
			const newStats = await this.prismaService.userStats.create({
				data: { userId },
				include: { activeStreak: true },
			});

			return plainToInstance(UserStatsDto, newStats);
		}

		return plainToInstance(UserStatsDto, stats);
	}

	public async syncUserStats(
		userId: string,
		timezone: string,
		userStats?: Prisma.UserStatsGetPayload<typeof userSelect.userStats>,
	): Promise<UserStatsDto> {
		let stats =
			userStats ??
			(await this.prismaService.userStats.findUnique({
				where: { userId },
				include: { activeStreak: true },
			}));

		if (!stats) {
			stats = await this.prismaService.userStats.create({
				data: { userId },
				include: { activeStreak: true },
			});

			return plainToInstance(UserStatsDto, stats);
		}

		const wasStreakUpdated = await this.streakService.validateStreakExpiration(
			userId,
			timezone,
			stats.activeStreak ?? undefined,
		);

		if (wasStreakUpdated) {
			const freshStats = await this.prismaService.userStats.findUnique({
				where: { userId },
				include: { activeStreak: true },
			});

			if (freshStats) stats = freshStats;
		}

		const now = new Date();

		const challengeRestoresUpdate = this.resetChallengeRestores(stats, now);
		const streakUpdates = this.getStreakUpdates(stats, now);

		if (!challengeRestoresUpdate && !streakUpdates)
			return plainToInstance(UserStatsDto, stats);

		const updateData = {
			...challengeRestoresUpdate,
			...streakUpdates,
		};

		const where: Prisma.UserStatsWhereInput = { userId };

		if (streakUpdates)
			where.streakRestoresResetAt = stats.streakRestoresResetAt;

		if (challengeRestoresUpdate)
			where.challengeRestoresResetAt = stats.challengeRestoresResetAt;

		const updated = await this.prismaService.userStats.updateMany({
			where,
			data: updateData,
		});

		if (updated.count > 0) {
			return plainToInstance(UserStatsDto, {
				...stats,
				...updateData,
			});
		}

		const result = await this.prismaService.userStats.findUnique({
			where: { userId },
			include: { activeStreak: true },
		});

		return plainToInstance(UserStatsDto, result);
	}

	public resetChallengeRestores(
		stats: UserStats,
		fromDate?: Date,
	): GetChallengeRestoresUpdatesResponse | null {
		const now = fromDate ?? new Date();

		const resetAt = stats.challengeRestoresResetAt;

		if (now < resetAt) return null;

		const missedEntireWeek = dayjs(now).diff(resetAt, 'week') >= 1;

		let newRestores: number;

		if (missedEntireWeek) {
			newRestores = 3;
		} else if (stats.challengeRestores >= 2) {
			newRestores = 3;
		} else {
			newRestores = 2;
		}

		return {
			challengeRestores: newRestores,
			challengeRestoresResetAt: getNextMondayUTC(now),
		};
	}

	public getStreakUpdates(
		stats: UserStats,
		fromDate?: Date,
	): GetStreakUpdatesResponse | null {
		const now = fromDate ?? new Date();

		const resetAt = stats.streakRestoresResetAt;

		if (now < resetAt) return null;

		return {
			streakRestores: 2,
			streakRestoresResetAt: getNextMondayUTC(now),
		};
	}
}
