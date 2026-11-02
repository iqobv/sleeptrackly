import { StreakModule } from '@api/streak/streak.module';
import { Module } from '@nestjs/common';
import { UserStatsController } from './user-stats.controller';
import { UserStatsService } from './user-stats.service';

@Module({
	controllers: [UserStatsController],
	providers: [UserStatsService],
	exports: [UserStatsService],
	imports: [StreakModule],
})
export class UserStatsModule {}
