import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';
import { QueryDto, SleepEntryDto } from './dto';

dayjs.extend(isoWeek);
dayjs.extend(utc);

const FORMAT = 'YYYY-MM-DD';

@Injectable()
export class SleepEntryService {
	constructor(private readonly prismaService: PrismaService) {}

	async findByUserId(userId: string) {
		return await this.prismaService.sleepEntry.findMany({ where: { userId } });
	}

	private buildDaysForWeek(
		startOfWeek: Dayjs,
		entries: SleepEntryDto[],
	): { day: string; data: SleepEntryDto | null }[] {
		return Array.from({ length: 7 }, (_, i) => {
			const day = startOfWeek.add(i, 'day').format(FORMAT);
			const data = entries.find((entry) => entry.dateForChart === day) || null;
			return { day, data };
		});
	}

	private calculateStatistics(
		days: { day: string; data: SleepEntryDto | null }[],
	) {
		const totalSleepDuration = days.reduce(
			(acc, d) => acc + (d.data?.sleepDuration || 0),
			0,
		);
		const daysWithData = days.filter((d) => d.data).length;

		return {
			totalSleepDuration,
			averageSleepDurationByData: daysWithData
				? totalSleepDuration / daysWithData
				: 0,
			averageSleepDurationForWeek: totalSleepDuration / 7,
		};
	}

	async getSleepsEntryForWeek(userId: string, query: QueryDto) {
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

		return {
			statistics,
			days,
			hasMore: !!moreRecord,
		};
	}
}
