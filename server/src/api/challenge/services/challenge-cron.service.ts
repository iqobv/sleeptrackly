import { ChallengeTier } from '@generated/prisma/enums';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { generateRange } from '../utils/generate-range.util';
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
			const { availableFrom, availableTo } = generateRange();

			const loadout = this.generateWeeklyLoadout();
			this.logger.log(`Weekly loadout selected: ${loadout.join(', ')}`);

			const usedTemplateIds: string[] = [];

			for (const tier of loadout) {
				await this.challengeGeneratorService.generateChallengeForTier({
					tier,
					availableFrom,
					availableTo,
					usedTemplateIds,
				});
			}
		} catch (error) {
			this.logger.error('Error generating challenges:', error);
		}
	}

	private generateWeeklyLoadout(): ChallengeTier[] {
		const loadout: ChallengeTier[] = [
			ChallengeTier.TIER_1,
			ChallengeTier.TIER_2,
		];

		const allTiers = Object.values(ChallengeTier);
		const hasFourthSlot = Math.random() > 0.5;

		const totalSlots = hasFourthSlot ? 4 : 3;

		for (let i = 2; i < totalSlots; i++) {
			const randomTier = allTiers[Math.floor(Math.random() * allTiers.length)];
			loadout.push(randomTier);
		}

		return loadout;
	}
}
