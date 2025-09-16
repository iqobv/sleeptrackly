import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserProviderModule } from './user-provider/user-provider.module';
import { SleepEntryModule } from './sleep-entry/sleep-entry.module';
import { UserSleepStatusModule } from './user-sleep-status/user-sleep-status.module';
import { ChallengeModule } from './challenge/challenge.module';
import { ChallengeTaskModule } from './challenge-task/challenge-task.module';

@Module({
  imports: [UserModule, AuthModule, UserProviderModule, SleepEntryModule, UserSleepStatusModule, ChallengeModule, ChallengeTaskModule]
})
export class ApiModule {}
