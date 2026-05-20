import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';
import { QueryDto, SleepEntryDto } from './dto';
import { GroupedByWeek } from './interfaces';

dayjs.extend(isoWeek);
dayjs.extend(utc);

@Injectable()
export class SleepEntryService {
	constructor(private readonly prismaService: PrismaService) {}

	async findByUserId(userId: string) {
		return await this.prismaService.sleepEntry.findMany({ where: { userId } });
	}

	private getGroupedByWeek(sleepEntries: SleepEntryDto[]) {
		return sleepEntries.reduce((acc, entry) => {
			const date = dayjs(entry.dateForChart, 'YYYY-MM-DD');
			const key = `${date.year()}-W${date.isoWeek()}`;
			if (!acc[key]) acc[key] = [];
			acc[key].push(entry);
			return acc;
		}, {} as GroupedByWeek);
	}

	private getSortedWeeks(groupedByWeek: GroupedByWeek) {
		return Object.keys(groupedByWeek).sort((a, b) => {
			const [yearA, weekA] = a.split('-W').map(Number);
			const [yearB, weekB] = b.split('-W').map(Number);
			return (
				dayjs().isoWeek(weekB).year(yearB).startOf('isoWeek').valueOf() -
				dayjs().isoWeek(weekA).year(yearA).startOf('isoWeek').valueOf()
			);
		});
	}

	private getCurrentWeekKey() {
		const now = dayjs();
		return `${now.year()}-W${now.isoWeek()}`;
	}

	private buildDaysForWeek(
		year: number,
		weekNumber: number,
		entries: SleepEntryDto[],
	): { day: string; data: SleepEntryDto | null }[] {
		const startOfWeek = dayjs()
			.year(year)
			.isoWeek(weekNumber)
			.startOf('isoWeek');
		return Array.from({ length: 7 }, (_, i) => {
			const day = startOfWeek.clone().add(i, 'day').format('YYYY-MM-DD');
			const data = entries.find((entry) => entry.dateForChart === day) || null;
			return { day, data };
		});
	}

	private calculateStatistics(
		weekNumber: number,
		days: { day: string; data: SleepEntryDto | null }[],
	) {
		const totalSleepDuration = days.reduce(
			(acc, d) => acc + (d.data?.sleepDuration || 0),
			0,
		);
		const daysWithData = days.filter((d) => d.data).length;

		return {
			weekNumber,
			totalSleepDuration,
			averageSleepDurationByData: daysWithData
				? totalSleepDuration / daysWithData
				: 0,
			averageSleepDurationForWeek: totalSleepDuration / 7,
		};
	}

	async getSleepsEntryForWeek(userId: string, query: QueryDto) {
		const { week = 0 } = query;
		const sleepEntries = await this.findByUserId(userId);

		const groupedByWeek = this.getGroupedByWeek(sleepEntries);
		const sortedWeeks = this.getSortedWeeks(groupedByWeek);

		let year: number, weekNumber: number, entriesForWeek: SleepEntryDto[];

		if (week === 0) {
			const now = dayjs();
			year = now.year();
			weekNumber = now.isoWeek();
			entriesForWeek = groupedByWeek[this.getCurrentWeekKey()] || [];
		} else {
			const selectedKey = sortedWeeks[week];
			if (!selectedKey) {
				const now = dayjs();
				weekNumber = now.isoWeek();
				const startOfWeek = now.startOf('isoWeek');

				const days = Array.from({ length: 7 }, (_, i) => ({
					day: startOfWeek.clone().add(i, 'day').format('YYYY-MM-DD'),
					data: null,
				}));

				return {
					statistics: {
						weekNumber,
						totalSleepDuration: 0,
						averageSleepDurationByData: 0,
						averageSleepDurationForWeek: 0,
					},
					days,
					totalWeeks: 1,
				};
			}

			const [yearStr, weekStr] = selectedKey.split('-W');
			year = Number(yearStr);
			weekNumber = Number(weekStr);
			entriesForWeek = groupedByWeek[selectedKey];
		}

		const days = this.buildDaysForWeek(year, weekNumber, entriesForWeek);
		const statistics = this.calculateStatistics(weekNumber, days);

		return {
			statistics,
			days,
			totalWeeks: sortedWeeks.length,
		};
	}
}
