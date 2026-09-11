import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ChallengeGeneratorService } from './challenge-generator.service';

@Injectable()
export class ChallengeCronService {
	private readonly logger = new Logger(ChallengeCronService.name);

	constructor(
		private readonly challengeGeneratorService: ChallengeGeneratorService,
	) {}

	@Cron('0 3 * * 0', { name: 'generateChallenges' })
	public async generateChallenges(): Promise<void> {
		this.logger.log('Generating challenges for the week...');

		try {
			await this.challengeGeneratorService.generateChallenges(false);
		} catch (error) {
			this.logger.error('Error generating challenges:', error);
		}
	}
}
