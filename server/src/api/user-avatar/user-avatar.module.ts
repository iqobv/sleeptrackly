import { Module } from '@nestjs/common';
import { UserAvatarController } from './user-avatar.controller';
import { UserAvatarService } from './user-avatar.service';

@Module({
	controllers: [UserAvatarController],
	providers: [UserAvatarService],
	exports: [UserAvatarService],
})
export class UserAvatarModule {}
