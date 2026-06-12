import { NotificationModule } from '@api/notification/notification.module';
import { Module } from '@nestjs/common';
import { FriendshipController } from './friendship.controller';
import { FriendshipService } from './friendship.service';

@Module({
	controllers: [FriendshipController],
	imports: [NotificationModule],
	exports: [FriendshipService],
	providers: [FriendshipService],
})
export class FriendshipModule {}
