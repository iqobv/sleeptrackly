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
			const data = entries.find((entry) => entry.dateForChart === day) || null;
			return { day, data };
		});
	}

	private calculateStatistics(days: SleepDayDto[]): SleepStatisticsDto {
		const totalSleepDuration = days.reduce(
			(acc, d) => acc + (d.data?.sleepDuration || 0),
			0,
		);
		const daysWithData = days.filter((d) => d.data).length;

		return {
			totalSleepDuration,
			averageSleepDuration: daysWithData
				? totalSleepDuration / daysWithData
				: 0,
		};
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

		const days = this.buildDaysForWeek(startOfWeek, sleepEntries);
		const statistics = this.calculateStatistics(days);

		const moreRecord = await this.prismaService.sleepEntry.findFirst({
			where: {
				userId,
				dateForChart: {
					lt: startDate,
				},
			},
		});

		const result = {
			statistics,
			days,
			hasMore: !!moreRecord,
		};

		return plainToInstance(SleepDashboardDto, result);
	}
}
