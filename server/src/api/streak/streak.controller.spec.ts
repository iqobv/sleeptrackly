import { Test, TestingModule } from '@nestjs/testing';
import { StreakController } from './streak.controller';
import { StreakService } from './streak.service';

describe('StreakController', () => {
  let controller: StreakController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StreakController],
      providers: [StreakService],
    }).compile();

    controller = module.get<StreakController>(StreakController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
