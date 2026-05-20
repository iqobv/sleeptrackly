import { Module } from '@nestjs/common';
import { RewardModule } from '../reward/reward.module';
import { WeeklySummaryModule } from '../weekly-summary/weekly-summary.module';
import { UserSleepStatusController } from './user-sleep-status.controller';
import { UserSleepStatusService } from './user-sleep-status.service';

@Module({
	imports: [RewardModule, WeeklySummaryModule],
	controllers: [UserSleepStatusController],
	providers: [UserSleepStatusService],
	exports: [UserSleepStatusService],
})
export class UserSleepStatusModule {}
