import { Module } from '@nestjs/common';
import { UserSleepStatusController } from './user-sleep-status.controller';
import { UserSleepStatusService } from './user-sleep-status.service';

@Module({
	controllers: [UserSleepStatusController],
	providers: [UserSleepStatusService],
	exports: [UserSleepStatusService],
})
export class UserSleepStatusModule {}
