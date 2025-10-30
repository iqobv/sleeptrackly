import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserProviderModule } from './user-provider/user-provider.module';
import { SleepEntryModule } from './sleep-entry/sleep-entry.module';
import { UserSleepStatusModule } from './user-sleep-status/user-sleep-status.module';
import { ChallengeModule } from './challenge/challenge.module';
import { ChallengeTaskModule } from './challenge-task/challenge-task.module';
import { UserAvatarModule } from './user-avatar/user-avatar.module';
import { ImageModule } from './image/image.module';
import { ProfileModule } from './profile/profile.module';
import { TokenModule } from './token/token.module';
import { FriendshipModule } from './friendship/friendship.module';
import { ReportModule } from './report/report.module';

@Module({
	imports: [
		UserModule,
		AuthModule,
		UserProviderModule,
		SleepEntryModule,
		UserSleepStatusModule,
		ChallengeModule,
		ChallengeTaskModule,
		UserAvatarModule,
		ImageModule,
		ProfileModule,
		TokenModule,
		FriendshipModule,
		ReportModule,
	],
})
export class ApiModule {}
