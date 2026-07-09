import { AchievementModule } from '@api/achievement/achievement.module';
import { RewardModule } from '@api/reward/reward.module';
import { SleepEntryModule } from '@api/sleep-entry/sleep-entry.module';
import { WeeklySummaryModule } from '@api/weekly-summary/weekly-summary.module';
import { Module } from '@nestjs/common';
import { UserSleepStatusController } from './user-sleep-status.controller';
import { UserSleepStatusService } from './user-sleep-status.service';

@Module({
	imports: [
		RewardModule,
		WeeklySummaryModule,
		SleepEntryModule,
		AchievementModule,
	],
	controllers: [UserSleepStatusController],
	providers: [UserSleepStatusService],
	exports: [UserSleepStatusService],
})
export class UserSleepStatusModule {}
