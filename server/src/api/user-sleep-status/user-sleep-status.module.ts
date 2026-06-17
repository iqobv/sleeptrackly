import { RewardModule } from '@api/reward/reward.module';
import { WeeklySummaryModule } from '@api/weekly-summary/weekly-summary.module';
import { Module } from '@nestjs/common';
import { UserSleepStatusController } from './user-sleep-status.controller';
import { UserSleepStatusService } from './user-sleep-status.service';

@Module({
	imports: [RewardModule, WeeklySummaryModule],
	controllers: [UserSleepStatusController],
	providers: [UserSleepStatusService],
	exports: [UserSleepStatusService],
})
export class UserSleepStatusModule {}
