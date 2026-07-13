import { AchievementModule } from '@api/achievement/achievement.module';
import { Module } from '@nestjs/common';
import { AdminChallengeController } from './controllers/admin-challenge.controller';
import { ChallengeController } from './controllers/challenge.controller';
import { AdminChallengeService } from './services/admin-challenge.service';
import { ChallengeCronService } from './services/challenge-cron.service';
import { ChallengeService } from './services/challenge.service';

@Module({
	imports: [AchievementModule],
	controllers: [ChallengeController, AdminChallengeController],
	exports: [ChallengeService],
	providers: [ChallengeCronService, ChallengeService, AdminChallengeService],
})
export class ChallengeModule {}
