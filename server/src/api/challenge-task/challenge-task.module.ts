import { AchievementModule } from '@api/achievement/achievement.module';
import { Module } from '@nestjs/common';
import { ChallengeTaskController } from './challenge-task.controller';
import { ChallengeTaskService } from './challenge-task.service';

@Module({
	controllers: [ChallengeTaskController],
	imports: [AchievementModule],
	providers: [ChallengeTaskService],
	exports: [ChallengeTaskService],
})
export class ChallengeTaskModule {}
