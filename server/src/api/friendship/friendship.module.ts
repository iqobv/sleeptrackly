import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { FriendshipController } from './friendship.controller';
import { FriendshipService } from './friendship.service';

@Module({
	controllers: [FriendshipController],
	imports: [UserModule],
	providers: [FriendshipService],
})
export class FriendshipModule {}
