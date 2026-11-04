import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsService } from './services/statistics.service';
import { StatisticsController } from './statistics.controller';

describe('StatisticsController', () => {
	let controller: StatisticsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [StatisticsController],
			providers: [StatisticsService],
		}).compile();

		controller = module.get<StatisticsController>(StatisticsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
