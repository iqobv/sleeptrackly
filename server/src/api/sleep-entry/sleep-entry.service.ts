import { WeeklySummaryPublisherService } from '@api/weekly-summary/services/weekly-summary-publisher.service';
import { Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { DATE_FORMAT } from '@libs/constants/date-format.constants';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { calculateSleepDuration } from '@libs/utils/calculate-sleep-duration.util';
import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';
import { CreateSleepEntryDto } from './dto/create-sleep-entry.dto';
import { QueryDto } from './dto/query.dto';
import { SleepDashboardDto } from './dto/sleep-dashboard.dto';
import { SleepDayDto } from './dto/sleep-day.dto';
import { SleepEntryDto } from './dto/sleep-entry.dto';
import { SleepStatisticsDto } from './dto/statistics.dto';
import { UpdateSleepEntryDto } from './dto/update-sleep-entry.dto';
import { NoOverlapParams } from './interfaces/no-overlap-params.interface';

dayjs.extend(isoWeek);
dayjs.extend(utc);

@Injectable()
export class SleepEntryService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly weeklySummaryPublisherService: WeeklySummaryPublisherService,
	) {}

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
			const day = startOfWeek.add(i, 'day').format(DATE_FORMAT);
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

		const startOfWeek = dayjs(date, DATE_FORMAT).startOf('isoWeek');
		const endOfWeek = dayjs(date, DATE_FORMAT).endOf('isoWeek');
		const startDate = startOfWeek.format(DATE_FORMAT);
		const endDate = endOfWeek.format(DATE_FORMAT);

		const sleepEntries = await this.prismaService.sleepEntry.findMany({
			where: {
				userId,
				dateForChart: {
					gte: startDate,
					lte: endDate,
				},
			},
		});

		const mappedEntries = plainToInstance(SleepEntryDto, sleepEntries);
		const days = this.buildDaysForWeek(startOfWeek, mappedEntries);

		const entriesCount = sleepEntries.length;
		const totalSleepDuration = sleepEntries.reduce(
			(acc, s) => acc + s.sleepDuration,
			0,
		);
		const totalRating = sleepEntries.reduce((acc, s) => acc + s.rating, 0);

		const mappedStatistics: SleepStatisticsDto = {
			totalSleepDuration,
			averageSleepDuration:
				entriesCount > 0 ? Math.round(totalSleepDuration / entriesCount) : 0,
			averageSleepRating: entriesCount > 0 ? totalRating / entriesCount : 0,
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

	public async findById(
		id: string,
		userId: string,
		tx?: Prisma.TransactionClient,
	): Promise<SleepEntryDto> {
		const prisma = tx ?? this.prismaService;

		const sleepEntry = await prisma.sleepEntry.findUnique({
			where: { id, userId },
		});

		if (!sleepEntry)
			throw new NotFoundException(ERROR_MESSAGES.SLEEP_ENTRY.NOT_FOUND);

		return plainToInstance(SleepEntryDto, sleepEntry);
	}

	public async createSleepEntry(
		userId: string,
		dto: CreateSleepEntryDto,
		tx?: Prisma.TransactionClient,
	): Promise<SleepEntryDto> {
		const { sleepStart, sleepEnd, dateForChart, ...rest } = dto;

		const prisma = tx ?? this.prismaService;

		const start = new Date(sleepStart);
		const end = new Date(sleepEnd);

		await this.ensureNoOverlap({ userId, start, end }, prisma);

		const { sleepDuration } = calculateSleepDuration(sleepStart, sleepEnd);

		const created = await prisma.sleepEntry.create({
			data: {
				...rest,
				sleepDuration,
				dateForChart: dateForChart,
				sleepEnd: new Date(sleepEnd),
				sleepStart: new Date(sleepStart),
				user: { connect: { id: userId } },
			},
		});

		await this.weeklySummaryPublisherService.dispatchRecalculation({
			userId,
			dateForChart,
			isManual: true,
		});

		return plainToInstance(SleepEntryDto, created);
	}

	public async updateSleepEntry(
		id: string,
		userId: string,
		dto: UpdateSleepEntryDto,
		tx?: Prisma.TransactionClient,
	): Promise<SleepEntryDto> {
		const { dateForChart, sleepEnd, sleepStart, ...rest } = dto;

		const prisma = tx ?? this.prismaService;

		const sleepEntry = await this.findById(id, userId, prisma);

		const targetStart = sleepStart
			? new Date(sleepStart)
			: sleepEntry.sleepStart;
		const targetEnd = sleepEnd ? new Date(sleepEnd) : sleepEntry.sleepEnd;

		if (sleepStart || sleepEnd) {
			await this.ensureNoOverlap(
				{
					userId,
					start: targetStart,
					end: targetEnd,
					excludeEntryId: id,
				},
				prisma,
			);
		}

		const { sleepDuration, dateForChart: generatedDateForChart } =
			calculateSleepDuration(targetStart, targetEnd);

		const updated = await this.prismaService.sleepEntry.update({
			where: { id, userId },
			data: {
				...rest,
				sleepDuration,
				dateForChart:
					dateForChart ?? sleepEntry.dateForChart ?? generatedDateForChart,
				sleepEnd: targetEnd,
				sleepStart: targetStart,
			},
		});

		await this.weeklySummaryPublisherService.dispatchRecalculation({
			userId,
			dateForChart: updated.dateForChart,
			isManual: true,
		});

		return plainToInstance(SleepEntryDto, updated);
	}

	public async deleteSleepEntry(
		id: string,
		userId: string,
		tx?: Prisma.TransactionClient,
	): Promise<MessageResponse> {
		const prisma = tx ?? this.prismaService;

		const sleepEntry = await this.findById(id, userId, prisma);

		await prisma.sleepEntry.delete({
			where: { id, userId },
		});

		await this.weeklySummaryPublisherService.dispatchRecalculation({
			userId,
			dateForChart: sleepEntry.dateForChart,
			isManual: true,
		});

		return SUCCESS_MESSAGES.SLEEP_ENTRY.DELETED;
	}

	private async ensureNoOverlap(
		params: NoOverlapParams,
		tx?: Prisma.TransactionClient,
	): Promise<void> {
		const { userId, start, end, excludeEntryId } = params;

		const prisma = tx ?? this.prismaService;

		const overlappingEntry = await prisma.sleepEntry.findFirst({
			where: {
				userId,
				id: excludeEntryId ? { not: excludeEntryId } : undefined,
				sleepStart: { lt: end },
				sleepEnd: { gt: start },
			},
			select: { id: true },
		});

		if (overlappingEntry) {
			throw new ConflictException(ERROR_MESSAGES.SLEEP_ENTRY.OVERLAPPING_TIME);
		}
	}
}
