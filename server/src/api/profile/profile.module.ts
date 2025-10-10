import { Module } from '@nestjs/common';
import { ChallengeModule } from '../challenge/challenge.module';
import { SleepEntryModule } from '../sleep-entry/sleep-entry.module';
import { UserModule } from '../user/user.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { FriendshipModule } from '../friendship/friendship.module';

@Module({
	controllers: [ProfileController],
	imports: [UserModule, ChallengeModule, SleepEntryModule, FriendshipModule],
	providers: [ProfileService],
})
export class ProfileModule {}
