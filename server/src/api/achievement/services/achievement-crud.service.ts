import { ImageService } from '@api/image/image.service';
import { PrismaService } from '@infra/prisma/prisma.service';
import { DEFAULT_URLS } from '@libs/constants/default-urls.constants';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import { transformProduct } from '@libs/mappers/translation-products.mapper';
import { productInclude } from '@libs/prisma/product.include.prisma';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AchievementDto, FullAchievementDto } from '../dto/achievement.dto';
import { CreateAchievementDto } from '../dto/create-achievement.dto';
import { UpdateAchievementDto } from '../dto/update-achievement.dto';
import { UserAchievementDto } from '../dto/user-achievement.dto';

@Injectable()
export class AchievementCrudService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly imageService: ImageService,
	) {}

	public async createAchievement(
		dto: CreateAchievementDto,
		icon?: Express.Multer.File,
	): Promise<AchievementDto> {
		const { translations, ...rest } = dto;

		let iconUrl = DEFAULT_URLS.ACHIEVEMENT;

		if (icon) {
			const uploadedIcon = await this.imageService.uploadImage({
				file: icon,
				folder: 'achievements',
				oldUrl: null,
				placeholderUrl: DEFAULT_URLS.ACHIEVEMENT,
			});
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
			include: {
				translations: true,
			},
		});

		return plainToInstance(AchievementDto, achievement);
	}

	public async getAllAchievementsForAdmin(): Promise<AchievementDto[]> {
		const achievements = await this.prismaService.achievement.findMany({
			include: {
				translations: true,
			},
		});

		return plainToInstance(AchievementDto, achievements);
	}

	public async getAllAchievements(
		userId: string,
		language: string = 'en',
	): Promise<UserAchievementDto[]> {
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

		const achievementsWithStatus = achievements.flatMap(
			({ id, translations, isHidden, rewardProduct, ...rest }) => {
				const translation = translations.find((t) => t.language === language) ||
					translations.find((t) => t.language === 'en') || {
						language: 'en',
						title: 'No translation available',
						description: 'Description not available',
					};
				const productTranslation =
					rewardProduct && transformProduct(rewardProduct, language);
				const productName =
					productTranslation?.item?.translation?.name ||
					productTranslation?.bundle?.translation?.name ||
					'Unknown Product';

				const isAchieved = achievedMap.has(id);

				if (isHidden && !isAchieved) return [];

				return {
					id,
					isAchieved,
					translation,
					achievedAt: achievedMap.get(id) || null,
					rewardProduct: productTranslation ? { name: productName } : null,
					...rest,
				};
			},
		);

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

		return plainToInstance(UserAchievementDto, sortedAchievements);
	}

	public async getAchievementById(id: string): Promise<FullAchievementDto> {
		const achievement = await this.prismaService.achievement.findUnique({
			where: { id },
			include: {
				translations: true,
				rewardProduct: {
					include: productInclude(),
				},
			},
		});

		if (!achievement)
			throw new NotFoundException(ERROR_MESSAGES.ACHIEVEMENT.NOT_FOUND);

		return plainToInstance(FullAchievementDto, achievement);
	}

	public async updateAchievement(
		id: string,
		dto: UpdateAchievementDto,
		icon?: Express.Multer.File,
	): Promise<FullAchievementDto> {
		const achievement = await this.getAchievementById(id);

		let iconUrl = achievement.iconUrl;

		if (icon) {
			const uploadedIcon = await this.imageService.uploadImage({
				file: icon,
				folder: 'achievements',
				oldUrl: achievement.iconUrl,
				placeholderUrl: DEFAULT_URLS.ACHIEVEMENT,
			});

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
						},
						update: {
							...translation,
						},
					})),
				},
			},
			include: {
				translations: true,
			},
		});

		return plainToInstance(FullAchievementDto, updatedAchievement);
	}

	public async deleteAchievement(id: string): Promise<MessageResponse> {
		const achievement = await this.getAchievementById(id);

		if (
			achievement.iconUrl &&
			achievement.iconUrl !== DEFAULT_URLS.ACHIEVEMENT
		) {
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
