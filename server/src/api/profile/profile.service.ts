import { Friendship, User } from '@generated/prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
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

		const isSameUser = user.id === authUser?.id;
		const isAdmin = authUser?.role === 'ADMIN';
		const isRestrictedViewer = !isSameUser && !isAdmin;

		if (
			isRestrictedViewer &&
			user.userPrivacySettings?.profileVisibility === 'PRIVATE'
		) {
			throw new NotFoundException('Profile not found');
		}

		let friendship: Friendship | null = null;

		if (authUser?.id && !isSameUser) {
			friendship = await this.friendshipService.getFriendshipByUsersIds(
				user.id,
				authUser.id,
			);
		}

		if (
			isRestrictedViewer &&
			user.userPrivacySettings?.profileVisibility === 'FRIENDS' &&
			!friendship
		) {
			throw new NotFoundException('Profile not found');
		}

		const canViewStatistics =
			!isRestrictedViewer ||
			user.userPrivacySettings?.statisticsVisibility === 'PUBLIC' ||
			(user.userPrivacySettings?.statisticsVisibility === 'FRIENDS' &&
				!!friendship);

		const [equippedItems, statisticsData] = await Promise.all([
			this.userInventoryService.getUserEquippedItems(user.id),
			canViewStatistics
				? Promise.all([
						this.sleepEntryService.findByUserId(user.id),
						this.challengeService.findAll(user.id),
					])
				: Promise.resolve(null),
		]);

		let statistics: ProfileStatistics | null = null;

		if (statisticsData) {
			const [sleepEntries, challenges] = statisticsData;
			statistics = {
				countOfSleepEntries: sleepEntries.length,
				countOfCompletedChallenges: challenges.filter((c) => c.isCompleted)
					.length,
			};
		}

		const { email, role, userPrivacySettings, ...result } = user;

		return {
			...result,
			friendship,
			statistics,
			equippedItems,
		};
	}
}
