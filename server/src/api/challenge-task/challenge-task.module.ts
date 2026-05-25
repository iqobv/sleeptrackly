import { AchievementModule } from '@api/achievement/achievement.module';
import { forwardRef, Module } from '@nestjs/common';
import { ChallengeModule } from '../challenge/challenge.module';
import { ChallengeTaskController } from './challenge-task.controller';
import { ChallengeTaskService } from './challenge-task.service';

@Module({
	controllers: [ChallengeTaskController],
	providers: [ChallengeTaskService],
	imports: [forwardRef(() => ChallengeModule), AchievementModule],
	exports: [ChallengeTaskService],
})
export class ChallengeTaskModule {}
