import { AchievementModule } from '@api/achievement/achievement.module';
import { NotificationModule } from '@api/notification/notification.module';
import { Module } from '@nestjs/common';
import { StreakController } from './streak.controller';
import { StreakService } from './streak.service';

@Module({
	controllers: [StreakController],
	providers: [StreakService],
	exports: [StreakService],
	imports: [NotificationModule, AchievementModule],
})
export class StreakModule {}
