import { Injectable } from '@nestjs/common';
import { ChallengeService } from '../challenge/challenge.service';
import { SleepEntryService } from '../sleep-entry/sleep-entry.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ProfileService {
	constructor(
		private readonly userService: UserService,
		private readonly challengeService: ChallengeService,
		private readonly sleepEntryService: SleepEntryService,
	) {}

	async getProfileByUsername(username: string) {
		const user = await this.userService.findByUsername(username);

		const completedChallenges = (
			await this.challengeService.findAll(user.id)
		).filter((c) => c.isCompleted).length;

		const sleepEntries = (await this.sleepEntryService.findByUserId(user.id))
			.length;

		const { email, id, role, ...result } = user;

		return { ...result, completedChallenges, sleepEntries };
	}
}
