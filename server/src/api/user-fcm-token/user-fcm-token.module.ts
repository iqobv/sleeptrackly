import { Module } from '@nestjs/common';
import { UserFcmTokenController } from './user-fcm-token.controller';
import { UserFcmTokenService } from './user-fcm-token.service';

@Module({
	controllers: [UserFcmTokenController],
	providers: [UserFcmTokenService],
})
export class UserFcmTokenModule {}
