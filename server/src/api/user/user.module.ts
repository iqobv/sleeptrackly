import { Module } from '@nestjs/common';
import { UserAvatarModule } from '../user-avatar/user-avatar.module';
import { UserSleepStatusModule } from '../user-sleep-status/user-sleep-status.module';
import { UserService } from './user.service';

@Module({
	exports: [UserService],
	providers: [UserService],
	imports: [UserSleepStatusModule, UserAvatarModule],
})
export class UserModule {}
