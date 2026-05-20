import { Test, TestingModule } from '@nestjs/testing';
import { WeeklySummaryController } from './weekly-summary.controller';
import { WeeklySummaryService } from './weekly-summary.service';

describe('WeeklySummaryController', () => {
  let controller: WeeklySummaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeeklySummaryController],
      providers: [WeeklySummaryService],
    }).compile();

    controller = module.get<WeeklySummaryController>(WeeklySummaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
