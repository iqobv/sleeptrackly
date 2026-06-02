import { BaseFriendshipDto } from '@api/friendship/dto';
import { User } from '@generated/prisma/client';
import { ERROR_MESSAGES } from '@libs/constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ChallengeService } from '../challenge/challenge.service';
import { FriendshipService } from '../friendship/friendship.service';
import { SleepEntryService } from '../sleep-entry/sleep-entry.service';
import { UserInventoryService } from '../user-inventory/user-inventory.service';
import { UserService } from '../user/user.service';
import { ProfileDto, ProfileStatisticsDto } from './dto';

@Injectable()
export class ProfileService {
	constructor(
		private readonly userService: UserService,
		private readonly challengeService: ChallengeService,
		private readonly sleepEntryService: SleepEntryService,
		private readonly friendshipService: FriendshipService,
		private readonly userInventoryService: UserInventoryService,
	) {}

	public async getProfileByUsername(
		username: string,
		authUser: User | null,
	): Promise<ProfileDto> {
		const user = await this.userService.findByUsername(username);

		const isSameUser = user.id === authUser?.id;
		const isAdmin = authUser?.role === 'ADMIN';
		const isRestrictedViewer = !isSameUser && !isAdmin;

		if (
			isRestrictedViewer &&
			user.userPrivacySettings?.profileVisibility === 'PRIVATE'
		) {
			throw new NotFoundException(ERROR_MESSAGES.PROFILE.NOT_FOUND);
		}

		let friendship: BaseFriendshipDto | null = null;

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
			throw new NotFoundException(ERROR_MESSAGES.PROFILE.NOT_FOUND);
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

		let statistics: ProfileStatisticsDto | null = null;

		if (statisticsData) {
			const [sleepEntries, challenges] = statisticsData;
			statistics = {
				countOfSleepEntries: sleepEntries.length,
				countOfCompletedChallenges: challenges.filter((c) => c.isCompleted)
					.length,
			};
		}

		// const { email: _e, role: _r, userPrivacySettings: _ups, ...result } = user;

		return plainToInstance(ProfileDto, {
			...user,
			friendship,
			statistics,
			equippedItems,
		});
	}
}
