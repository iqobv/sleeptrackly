import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';
import { QueryDto } from './dto/query.dto';
import { SleepDashboardDto } from './dto/sleep-dashboard.dto';
import { SleepDayDto } from './dto/sleep-day.dto';
import { SleepEntryDto } from './dto/sleep-entry.dto';
import { SleepStatisticsDto } from './dto/statistics.dto';

dayjs.extend(isoWeek);
dayjs.extend(utc);

const FORMAT = 'YYYY-MM-DD';

@Injectable()
export class SleepEntryService {
	constructor(private readonly prismaService: PrismaService) {}

	public async findByUserId(userId: string): Promise<SleepEntryDto[]> {
		const sleepEntries = await this.prismaService.sleepEntry.findMany({
			where: { userId },
		});

		return plainToInstance(SleepEntryDto, sleepEntries);
	}

	private buildDaysForWeek(
		startOfWeek: Dayjs,
		entries: SleepEntryDto[],
	): SleepDayDto[] {
		return Array.from({ length: 7 }, (_, i) => {
			const day = startOfWeek.add(i, 'day').format(FORMAT);
			const data = entries.filter((entry) => entry.dateForChart === day);
			const sleepDuration = data.reduce(
				(acc, entry) => acc + entry.sleepDuration,
				0,
			);

			return { day, sleepDuration, data };
		});
	}
	public async getSleepsEntryForWeek(
		userId: string,
		query: QueryDto,
	): Promise<SleepDashboardDto> {
		const { date } = query;

		const startOfWeek = dayjs(date, FORMAT).startOf('isoWeek');
		const endOfWeek = dayjs(date, FORMAT).endOf('isoWeek');
		const startDate = startOfWeek.format(FORMAT);
		const endDate = endOfWeek.format(FORMAT);

		const sleepEntries = await this.prismaService.sleepEntry.findMany({
			where: {
				userId,
				dateForChart: {
					gte: startDate,
					lte: endDate,
				},
			},
		});

		const statistics = await this.prismaService.sleepEntry.groupBy({
			where: {
				userId,
				id: { in: sleepEntries.map((e) => e.id) },
			},
			by: ['dateForChart'],
			_sum: {
				sleepDuration: true,
			},
			_avg: {
				rating: true,
				sleepDuration: true,
			},
			_count: {
				id: true,
			},
		});

		const mappedEntries = plainToInstance(SleepEntryDto, sleepEntries);
		const days = this.buildDaysForWeek(startOfWeek, mappedEntries);

		const mappedStatistics: SleepStatisticsDto = {
			totalSleepDuration: statistics.reduce(
				(acc, s) => acc + (s._sum.sleepDuration || 0),
				0,
			),
			averageSleepDuration:
				statistics.reduce((acc, s) => acc + (s._avg.sleepDuration || 0), 0) /
				(statistics.length || 1),
			averageSleepRating:
				statistics.reduce((acc, s) => acc + (s._avg.rating || 0), 0) /
				(statistics.length || 1),
		};

		const moreRecord = await this.prismaService.sleepEntry.findFirst({
			where: {
				userId,
				dateForChart: {
					lt: startDate,
				},
			},
		});

		const result: SleepDashboardDto = {
			statistics: mappedStatistics,
			days,
			hasMore: !!moreRecord,
		};

		return plainToInstance(SleepDashboardDto, result);
	}
}
