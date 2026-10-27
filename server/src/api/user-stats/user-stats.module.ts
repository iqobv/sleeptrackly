import { Module } from '@nestjs/common';
import { UserStatsController } from './user-stats.controller';
import { UserStatsService } from './user-stats.service';

@Module({
	controllers: [UserStatsController],
	providers: [UserStatsService],
	exports: [UserStatsService],
})
export class UserStatsModule {}
