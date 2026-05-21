import { forwardRef, Module } from '@nestjs/common';
import { ChallengeTaskModule } from '../challenge-task/challenge-task.module';
import { ChallengeCleanupService } from './challenge-cleanup.service';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';

@Module({
	controllers: [ChallengeController],
	imports: [forwardRef(() => ChallengeTaskModule)],
	exports: [ChallengeService],
	providers: [ChallengeService, ChallengeCleanupService],
})
export class ChallengeModule {}
