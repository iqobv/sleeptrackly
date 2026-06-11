import { AchievementModule } from '@api/achievement/achievement.module';
import { Module } from '@nestjs/common';
import { ChallengeTaskController } from './challenge-task.controller';
import { ChallengeTaskService } from './challenge-task.service';

@Module({
	controllers: [ChallengeTaskController],
	providers: [ChallengeTaskService],
	imports: [AchievementModule],
	exports: [ChallengeTaskService],
})
export class ChallengeTaskModule {}
