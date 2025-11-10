import { forwardRef, Module } from '@nestjs/common';
import { UserAvatarModule } from '../user-avatar/user-avatar.module';
import { UserSleepStatusModule } from '../user-sleep-status/user-sleep-status.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
	exports: [UserService],
	providers: [UserService],
	imports: [UserSleepStatusModule, forwardRef(() => UserAvatarModule)],
	controllers: [UserController],
})
export class UserModule {}
