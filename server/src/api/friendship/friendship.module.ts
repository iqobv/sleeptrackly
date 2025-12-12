import { Module } from '@nestjs/common';
import { NotificationModule } from '../notification/notification.module';
import { UserModule } from '../user/user.module';
import { FriendshipController } from './friendship.controller';
import { FriendshipService } from './friendship.service';

@Module({
	controllers: [FriendshipController],
	imports: [UserModule, NotificationModule],
	exports: [FriendshipService],
	providers: [FriendshipService],
})
export class FriendshipModule {}
