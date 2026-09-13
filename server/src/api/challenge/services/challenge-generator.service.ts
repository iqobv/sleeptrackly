import { GenerationRulesDto } from '@api/challenge-template/dto/generation-rules.dto';
import { ChallengeTier } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { CHALLENGE_ERROR_MESSAGES } from '@libs/constants/error-messages';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
	GenerateChallengeDto,
	GenerateChallengeForTierDto,
} from '../dto/generate-challenge.dto';
import { calculateChallengeRewards } from '../utils/calculate-challenge-rewards.util';
import { calculateMaxRecoveries } from '../utils/calculate-recoveries.util';
import { generateRange } from '../utils/generate-range.util';
import { interpolateTranslation } from '../utils/interpolate-translation.util';

@Injectable()
export class ChallengeGeneratorService {
	private readonly logger = new Logger(ChallengeGeneratorService.name);

	constructor(private readonly prismaService: PrismaService) {}

	public async generateRandomChallenge(
		dto: GenerateChallengeDto,
	): Promise<void> {
		const { templateId, availableFrom, availableTo } = dto;

		const template = await this.prismaService.challengeTemplate.findUnique({
			where: { id: templateId },
			include: { translations: true },
		});

		if (!template)
			throw new NotFoundException(ERROR_MESSAGES.CHALLENGE_TEMPLATE.NOT_FOUND);

		const rules = template.generationRules as unknown as GenerationRulesDto;

		const durationDays = this.getRandomItem(rules.durations);
		const targetValue = durationDays;
		const maxRecoveries = calculateMaxRecoveries(durationDays);

		const metadata: Record<string, string | number> = {};

		if (rules.metadata) {
			for (const [key, options] of Object.entries(rules.metadata)) {
				metadata[key] = this.getRandomItem(options as (string | number)[]);
			}
		}

		const { dailyRewardCoins, grandPrizeCoins } = calculateChallengeRewards(
			template.tier,
			durationDays,
		);

		const variables = {
			durationDays,
			...metadata,
		};

		await this.prismaService.$transaction(async (tx) => {
			await tx.challenge.create({
				data: {
					type: template.type,
					tier: template.tier,
					visibility: 'PUBLISHED',
					targetValue,
					maxRecoveries,
					availableFrom,
					availableTo,
					dailyRewardCoins,
					rewardCoins: grandPrizeCoins,
					durationDays,
					metadata,
					translations: {
						createMany: {
							data: template.translations.map((translation) => ({
								language: translation.language,
								title: interpolateTranslation(translation.title, variables),
								description: interpolateTranslation(
									translation.description,
									variables,
								),
							})),
						},
					},
				},
			});

			await tx.challengeTemplate.update({
				where: { id: template.id },
				data: { lastUsedAt: new Date() },
			});
		});
	}

	public async generateChallengeForTier(
		dto: GenerateChallengeForTierDto,
	): Promise<void> {
		const { availableFrom, tier, availableTo, usedTemplateIds } = dto;
		const fallbackUsedIds = usedTemplateIds ?? [];

		const unusedCount = await this.prismaService.challengeTemplate.count({
			where: {
				tier,
				isActive: true,
				id: { notIn: fallbackUsedIds },
				lastUsedAt: null,
			},
		});

		let selectedTemplate = null;

		if (unusedCount > 0) {
			const skip = Math.floor(Math.random() * unusedCount);
			selectedTemplate = await this.prismaService.challengeTemplate.findFirst({
				where: {
					tier,
					isActive: true,
					id: { notIn: fallbackUsedIds },
					lastUsedAt: null,
				},
				skip,
			});
		} else {
			const usedCount = await this.prismaService.challengeTemplate.count({
				where: {
					tier,
					isActive: true,
					id: { notIn: fallbackUsedIds },
					lastUsedAt: { not: null },
				},
			});

			if (usedCount > 0) {
				const skip = Math.floor(Math.pow(Math.random(), 3) * usedCount);

				selectedTemplate = await this.prismaService.challengeTemplate.findFirst(
					{
						where: {
							tier,
							isActive: true,
							id: { notIn: fallbackUsedIds },
							lastUsedAt: { not: null },
						},
						orderBy: {
							lastUsedAt: 'asc',
						},
						skip,
					},
				);
			}
		}

		if (!selectedTemplate) {
			this.logger.warn(`No available template found for tier ${tier}`);
			return;
		}

		await this.generateRandomChallenge({
			templateId: selectedTemplate.id,
			availableFrom,
			availableTo,
		});

		usedTemplateIds?.push(selectedTemplate.id);

		this.logger.log(
			`Challenge generated for tier ${tier} using template ${selectedTemplate.id}`,
		);
	}

	public async regenerateChallenge(challengeId: string): Promise<void> {
		const challenge = await this.prismaService.challenge.findUnique({
			where: { id: challengeId },
		});

		if (!challenge)
			throw new NotFoundException(CHALLENGE_ERROR_MESSAGES.NOT_FOUND);

		const tier = challenge.tier;

		const { availableFrom, availableTo } = generateRange();

		await this.generateChallengeForTier({ tier, availableFrom, availableTo });
	}

	public async generateChallenges(currentWeek: boolean = false): Promise<void> {
		const { availableFrom, availableTo } = generateRange(currentWeek);

		const loadout = this.generateWeeklyLoadout();
		this.logger.log(`Weekly loadout selected: ${loadout.join(', ')}`);

		const usedTemplateIds: string[] = [];

		for (const tier of loadout) {
			await this.generateChallengeForTier({
				tier,
				availableFrom,
				availableTo,
				usedTemplateIds,
			});
		}
	}

	private generateWeeklyLoadout(): ChallengeTier[] {
		const loadout: ChallengeTier[] = [
			ChallengeTier.TIER_1,
			ChallengeTier.TIER_2,
		];

		const eligibleTiers = Object.values(ChallengeTier).filter(
			(tier) => tier !== ChallengeTier.TIER_4,
		);

		const hasFourthSlot = Math.random() > 0.5;
		const totalSlots = hasFourthSlot ? 4 : 3;

		for (let i = 2; i < totalSlots; i++) {
			const randomTier =
				eligibleTiers[Math.floor(Math.random() * eligibleTiers.length)];
			loadout.push(randomTier);
		}

		return loadout;
	}

	private getRandomItem<T>(items: T[]): T {
		const randomIndex = Math.floor(Math.random() * items.length);
		return items[randomIndex];
	}
}
