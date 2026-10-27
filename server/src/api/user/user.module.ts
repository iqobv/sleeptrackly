import { UserStatsModule } from '@api/user-stats/user-stats.module';
import { Module } from '@nestjs/common';
import { UserChallengeRecoveryCronService } from './services/user-challenge-recovery-cron.service';
import { UserCleanupService } from './services/user-cleanup.service';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { UserStatsService } from '@api/user-stats/user-stats.service';

@Module({
	exports: [UserService],
	providers: [
		UserService,
		UserCleanupService,
		UserChallengeRecoveryCronService,
		UserStatsService,
	],
	controllers: [UserController],
})
export class UserModule {}
