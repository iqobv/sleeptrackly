import { Test, TestingModule } from '@nestjs/testing';
import { mock, mockReset } from 'jest-mock-extended';
import { StatisticsQueryDto } from './dto/statistics-query.dto';
import { StatisticsDto } from './dto/statistics.dto';
import { StatisticsService } from './services/statistics.service';
import { StatisticsController } from './statistics.controller';

describe('StatisticsController', () => {
	let controller: StatisticsController;

	const statisticsServiceMock = mock<StatisticsService>();

	beforeEach(async () => {
		mockReset(statisticsServiceMock);

		const module: TestingModule = await Test.createTestingModule({
			controllers: [StatisticsController],
			providers: [
				{ provide: StatisticsService, useValue: statisticsServiceMock },
			],
		}).compile();

		controller = module.get<StatisticsController>(StatisticsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('getStatistics', () => {
		it('should call StatisticsService.getStatistics with query and return the result', async () => {
			const query: StatisticsQueryDto = { date: '2026-11-05' };

			const expectedResult = {
				totalRegisteredUsersCount: 100,
				hasPreviousWeekData: true,
			} as StatisticsDto;

			statisticsServiceMock.getStatistics.mockResolvedValue(expectedResult);

			const result = await controller.getStatistics(query);

			expect(statisticsServiceMock.getStatistics).toHaveBeenCalledWith(query);
			expect(statisticsServiceMock.getStatistics).toHaveBeenCalledTimes(1);

			expect(result).toEqual(expectedResult);
		});
	});
});
