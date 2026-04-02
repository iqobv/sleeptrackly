import { Injectable, NotFoundException } from '@nestjs/common';
import { Friendship, User } from '@prisma/client';
import { ChallengeService } from '../challenge/challenge.service';
import { FriendshipService } from '../friendship/friendship.service';
import { SleepEntryService } from '../sleep-entry/sleep-entry.service';
import { UserInventoryService } from '../user-inventory/user-inventory.service';
import { UserService } from '../user/user.service';
import { ProfileStatistics } from './dto';

@Injectable()
export class ProfileService {
	constructor(
		private readonly userService: UserService,
		private readonly challengeService: ChallengeService,
		private readonly sleepEntryService: SleepEntryService,
		private readonly friendshipService: FriendshipService,
		private readonly userInventoryService: UserInventoryService,
	) {}

	async getProfileByUsername(username: string, authUser: User | null) {
		const user = await this.userService.findByUsername(username);

		if (
			user.userPrivacySettings?.profileVisibility === 'PRIVATE' &&
			user.id !== authUser?.id &&
			authUser?.role !== 'ADMIN'
		)
			throw new NotFoundException('Profile not found');

		let friendship: Friendship | null = null;

		if (user && authUser?.id && user.id !== authUser.id) {
			friendship = await this.friendshipService.getFriendshipByUsersIds(
				user.id,
				authUser.id,
			);
		}

		if (
			user.userPrivacySettings?.profileVisibility === 'FRIENDS' &&
			!friendship
		) {
			throw new NotFoundException('Profile not found');
		}

		let statistics: ProfileStatistics | null = null;

		if (
			authUser?.id === user.id ||
			authUser?.role === 'ADMIN' ||
			(user.userPrivacySettings?.statisticsVisibility === 'FRIENDS' &&
				friendship) ||
			user.userPrivacySettings?.statisticsVisibility === 'PUBLIC'
		) {
			statistics = {
				countOfSleepEntries: (
					await this.sleepEntryService.findByUserId(user.id)
				).length,

				countOfCompletedChallenges: (
					await this.challengeService.findAll(user.id)
				).filter((c) => c.isCompleted).length,
			};
		}

		const equippedItems = await this.userInventoryService.getUserEquippedItems(
			user.id,
		);

		const { email, role, userPrivacySettings, ...result } = user;

		return {
			...result,
			friendship,
			statistics,
			equippedItems,
		};
	}
}
