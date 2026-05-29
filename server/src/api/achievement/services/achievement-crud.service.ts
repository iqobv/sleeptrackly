import { ImageService } from '@api/image/image.service';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { transformProduct } from '@libs/mappers';
import { productInclude } from '@libs/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAchievementDto, UpdateAchievementDto } from '../dto';

@Injectable()
export class AchievementCrudService {
	private readonly defaultIconUrl = 'placeholders/achievement.png';

	constructor(
		private readonly prismaService: PrismaService,
		private readonly imageService: ImageService,
	) {}

	async createAchievement(
		dto: CreateAchievementDto,
		icon?: Express.Multer.File,
	) {
		const { translations, ...rest } = dto;

		let iconUrl = this.defaultIconUrl;

		if (icon) {
			const uploadedIcon = await this.imageService.uploadImage(
				icon,
				'achievements',
				null,
				this.defaultIconUrl,
			);

			iconUrl = uploadedIcon.url;
		}

		const achievement = await this.prismaService.achievement.create({
			data: {
				iconUrl,
				...rest,
				translations: {
					createMany: {
						data: translations,
						skipDuplicates: true,
					},
				},
			},
		});

		return achievement;
	}

	async getUserAchievements(userId: string) {
		const userAchievements = await this.prismaService.userAchievement.findMany({
			where: { userId },
			include: {
				achievement: {
					include: {
						translations: true,
					},
				},
			},
		});

		return userAchievements;
	}

	async getAllAchievementsForAdmin() {
		return await this.prismaService.achievement.findMany({
			include: {
				translations: true,
			},
		});
	}

	async getAllAchievements(userId: string, language: string = 'en') {
		const achievements = await this.prismaService.achievement.findMany({
			where: {
				isActive: true,
			},
			include: {
				translations: {
					where: { language: { in: [language, 'en'] } },
					select: {
						title: true,
						description: true,
						language: true,
					},
				},
				rewardProduct: {
					include: productInclude(language),
				},
			},
		});

		const userAchievements = await this.prismaService.userAchievement.findMany({
			where: { userId },
			select: {
				achievementId: true,
				achievedAt: true,
			},
		});

		const achievedMap = new Map(
			userAchievements.map((ua) => [ua.achievementId, ua.achievedAt]),
		);

		const achievementsWithStatus = achievements
			.map(({ id, translations, isHidden, rewardProduct, ...rest }) => {
				const translation =
					translations.find((t) => t.language === language) ||
					translations.find((t) => t.language === 'en');
				const productTranslation =
					rewardProduct && transformProduct(rewardProduct, language);
				const productName =
					productTranslation?.item?.translation?.name ||
					productTranslation?.bundle?.translation?.name;

				const isAchieved = achievedMap.has(id);

				if (isHidden && !isAchieved) return;

				return {
					id,
					isAchieved,
					translation,
					achievedAt: achievedMap.get(id),
					rewardProduct: productTranslation ? { name: productName } : null,
					...rest,
				};
			})
			.filter(Boolean);

		const sortedAchievements = achievementsWithStatus.sort((a, b) => {
			if (!a || !b) return 0;

			if (a.isAchieved !== b.isAchieved) {
				return a.isAchieved ? -1 : 1;
			}

			if (a.isAchieved && b.isAchieved) {
				const dateA = a.achievedAt ? new Date(a.achievedAt).getTime() : 0;
				const dateB = b.achievedAt ? new Date(b.achievedAt).getTime() : 0;

				return dateB - dateA;
			}

			if (!a.isAchieved && !b.isAchieved) {
				if (a.type !== b.type) {
					return a.type.localeCompare(b.type);
				}

				return a.targetValue - b.targetValue;
			}

			return 0;
		});

		return sortedAchievements;
	}

	async getAchievementById(id: string) {
		const achievement = await this.prismaService.achievement.findUnique({
			where: { id },
			include: {
				translations: true,
			},
		});

		if (!achievement)
			throw new NotFoundException(ERROR_MESSAGES.ACHIEVEMENT.NOT_FOUND);

		return achievement;
	}

	async updateAchievement(
		id: string,
		dto: UpdateAchievementDto,
		icon?: Express.Multer.File,
	) {
		const achievement = await this.getAchievementById(id);

		let iconUrl = achievement.iconUrl;

		if (icon) {
			const uploadedIcon = await this.imageService.uploadImage(
				icon,
				'achievements',
				achievement.iconUrl,
				this.defaultIconUrl,
			);

			iconUrl = uploadedIcon.url;
		}

		const { translations, ...rest } = dto;

		const translationsToDelete = achievement.translations
			.filter(
				(existing) =>
					!translations?.some((t) => t.language === existing.language),
			)
			.map((t) => t.id);

		if (translationsToDelete.length > 0) {
			await this.prismaService.achievementTranslation.deleteMany({
				where: {
					id: { in: translationsToDelete },
				},
			});
		}

		const updatedAchievement = await this.prismaService.achievement.update({
			where: { id },
			data: {
				iconUrl,
				...rest,
				translations: {
					upsert: translations?.map((translation) => ({
						where: {
							achievementId_language: {
								achievementId: achievement.id,
								language: translation.language,
							},
						},
						create: {
							...translation,
							achievementId: achievement.id,
						},
						update: {
							...translation,
						},
					})),
				},
			},
		});

		return updatedAchievement;
	}

	async deleteAchievement(id: string) {
		const achievement = await this.getAchievementById(id);

		if (achievement.iconUrl && achievement.iconUrl !== this.defaultIconUrl) {
			await this.imageService.deleteImage(achievement.iconUrl);
		}

		await this.prismaService.achievement.delete({
			where: { id },
			include: {
				translations: true,
			},
		});

		return SUCCESS_MESSAGES.ACHIEVEMENT.DELETED;
	}
}
