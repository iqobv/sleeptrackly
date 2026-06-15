import { Module } from '@nestjs/common';
import { ChallengeCleanupService } from './challenge-cleanup.service';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';

@Module({
	controllers: [ChallengeController],
	exports: [ChallengeService],
	providers: [ChallengeService, ChallengeCleanupService],
})
export class ChallengeModule {}
