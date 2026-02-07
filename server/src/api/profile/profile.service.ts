import { Injectable } from '@nestjs/common';
import { Friendship } from '@prisma/client';
import { ChallengeService } from '../challenge/challenge.service';
import { FriendshipService } from '../friendship/friendship.service';
import { SleepEntryService } from '../sleep-entry/sleep-entry.service';
import { UserInventoryService } from '../user-inventory/user-inventory.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ProfileService {
	constructor(
		private readonly userService: UserService,
		private readonly challengeService: ChallengeService,
		private readonly sleepEntryService: SleepEntryService,
		private readonly friendshipService: FriendshipService,
		private readonly userInventoryService: UserInventoryService,
	) {}

	async getProfileByUsername(username: string, userId: string | null) {
		const user = await this.userService.findByUsername(username);

		const completedChallenges = (
			await this.challengeService.findAll(user.id)
		).filter((c) => c.isCompleted).length;

		const sleepEntries = (await this.sleepEntryService.findByUserId(user.id))
			.length;

		const equippedItems = await this.userInventoryService.getUserEquippedItems(
			user.id,
		);

		let friendship: Friendship | null = null;

		if (userId && user.id !== userId) {
			friendship = await this.friendshipService.getFriendshipByUsersIds(
				userId,
				user.id,
			);
		}

		const { email, role, ...result } = user;

		return {
			...result,
			friendship,
			completedChallenges,
			sleepEntries,
			equippedItems,
		};
	}
}
