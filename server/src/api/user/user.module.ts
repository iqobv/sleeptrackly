import { Module } from '@nestjs/common';
import { UserSleepStatusModule } from '../user-sleep-status/user-sleep-status.module';
import { UserService } from './user.service';

@Module({
	exports: [UserService],
	providers: [UserService],
	imports: [UserSleepStatusModule],
})
export class UserModule {}
