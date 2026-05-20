import { PrismaService } from '@infra/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { WeeklySummaryService } from './weekly-summary.service';

type PrismaMock = {
	weeklySleepSummary: {
		findUnique: jest.Mock;
		create: jest.Mock;
	};
	sleepEntry: {
		findMany: jest.Mock;
	};
	coinTransaction: {
		findMany: jest.Mock;
	};
};

describe('WeeklySummaryService', () => {
	let service: WeeklySummaryService;
	let prisma: PrismaMock;

	beforeEach(async () => {
		prisma = {
			weeklySleepSummary: {
				findUnique: jest.fn(),
				create: jest.fn(),
			},
			sleepEntry: {
				findMany: jest.fn(),
			},
			coinTransaction: {
				findMany: jest.fn(),
			},
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				WeeklySummaryService,
				{ provide: PrismaService, useValue: prisma },
			],
		}).compile();

		service = module.get<WeeklySummaryService>(WeeklySummaryService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('calculateAvgBedtimeOffset', () => {
		it('returns 0 for an empty array', () => {
			const result = service['calculateAvgBedtimeOffset']([]);
			expect(result).toBe(0);
		});

		it('calculates average correctly when all times are before midnight', () => {
			const dates = [
				new Date('2026-05-18T22:00:00Z'),
				new Date('2026-05-19T23:00:00Z'),
			];

			const result = service['calculateAvgBedtimeOffset'](dates);
			expect(result).toBe(1350);
		});

		it('calculates average correctly when all times are after midnight', () => {
			const dates = [
				new Date('2026-05-18T01:00:00Z'),
				new Date('2026-05-19T02:00:00Z'),
			];

			const result = service['calculateAvgBedtimeOffset'](dates);
			expect(result).toBe(90);
		});

		it('handles transition across midnight correctly', () => {
			const dates = [
				new Date('2026-05-18T23:00:00Z'),
				new Date('2026-05-19T01:00:00Z'),
			];

			const result = service['calculateAvgBedtimeOffset'](dates);
			expect(result).toBe(0);
		});

		it('handles extreme time differences properly', () => {
			const dates = [
				new Date('2026-05-18T20:00:00Z'),
				new Date('2026-05-19T04:00:00Z'),
			];

			const result = service['calculateAvgBedtimeOffset'](dates);
			expect(result).toBe(0);
		});
	});

	describe('calculateAvgWakeTimeOffset', () => {
		it('returns 0 for an empty array', () => {
			const result = service['calculateAvgWakeTimeOffset']([]);
			expect(result).toBe(0);
		});

		it('calculates typical morning wake times', () => {
			const dates = [
				new Date('2026-05-18T07:00:00Z'),
				new Date('2026-05-19T09:00:00Z'),
			];

			const result = service['calculateAvgWakeTimeOffset'](dates);
			expect(result).toBe(480);
		});

		it('calculates identical wake times', () => {
			const dates = [
				new Date('2026-05-18T08:30:00Z'),
				new Date('2026-05-19T08:30:00Z'),
			];

			const result = service['calculateAvgWakeTimeOffset'](dates);
			expect(result).toBe(510);
		});

		it('calculates late wake times', () => {
			const dates = [
				new Date('2026-05-18T11:15:00Z'),
				new Date('2026-05-19T13:45:00Z'),
			];

			const result = service['calculateAvgWakeTimeOffset'](dates);
			expect(result).toBe(750);
		});
	});
});
