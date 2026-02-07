import { Module } from '@nestjs/common';
import { ChallengeModule } from '../challenge/challenge.module';
import { FriendshipModule } from '../friendship/friendship.module';
import { SleepEntryModule } from '../sleep-entry/sleep-entry.module';
import { UserInventoryModule } from '../user-inventory/user-inventory.module';
import { UserModule } from '../user/user.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
	controllers: [ProfileController],
	imports: [
		UserModule,
		ChallengeModule,
		SleepEntryModule,
		FriendshipModule,
		UserInventoryModule,
	],
	providers: [ProfileService],
})
export class ProfileModule {}
