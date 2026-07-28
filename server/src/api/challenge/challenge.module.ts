import { AchievementModule } from '@api/achievement/achievement.module';
import { CoinTransactionModule } from '@api/coin-transaction/coin-transaction.module';
import { RewardModule } from '@api/reward/reward.module';
import { QUEUE_NAME } from '@libs/constants/queue.constants';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { AdminChallengeController } from './controllers/admin-challenge.controller';
import { ChallengeController } from './controllers/challenge.controller';
import { ChallengeProcessor } from './processors/challenge.processor';
import { AdminChallengeService } from './services/admin-challenge.service';
import { ChallengeCronService } from './services/challenge-cron.service';
import { ChallengeGeneratorService } from './services/challenge-generator.service';
import { ChallengePublisherService } from './services/challenge-publisher.service';
import { ChallengeRecoveryService } from './services/challenge-recovery.service';
import { ChallengeService } from './services/challenge.service';

@Module({
	imports: [
		AchievementModule,
		CoinTransactionModule,
		RewardModule,
		BullModule.registerQueue({
			name: QUEUE_NAME.CHALLENGES,
		}),
	],
	controllers: [ChallengeController, AdminChallengeController],
	exports: [ChallengeService, ChallengePublisherService],
	providers: [
		ChallengeCronService,
		ChallengeService,
		AdminChallengeService,
		ChallengeGeneratorService,
		ChallengePublisherService,
		ChallengeProcessor,
		ChallengeRecoveryService,
	],
})
export class ChallengeModule {}
