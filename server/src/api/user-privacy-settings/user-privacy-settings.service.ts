import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { UpdateUserPrivacySettings } from './dto';

@Injectable()
export class UserPrivacySettingsService {
	constructor(private readonly prismaService: PrismaService) {}

	async updateUserPrivacySettings(
		userId: string,
		dto: UpdateUserPrivacySettings,
	) {
		const {
			acceptFriendRequests,
			showActivity,
			profileVisibility,
			achievementsVisibility,
			statisticsVisibility,
		} = dto;

		const userPrivacySettings = await this.getUserPrivacySettings(userId);

		const data = {
			acceptFriendRequests,
			showActivity,
			profileVisibility,
			achievementsVisibility,
			statisticsVisibility,
		};

		return await this.prismaService.userPrivacySettings.update({
			where: { id: userPrivacySettings.id, userId },
			data,
		});
	}

	async getUserPrivacySettings(userId: string) {
		const userPrivacySettings =
			await this.prismaService.userPrivacySettings.findUnique({
				where: { userId },
			});

		if (!userPrivacySettings) {
			return await this.createUserPrivacySettings(userId);
		}

		return userPrivacySettings;
	}

	async createUserPrivacySettings(
		userId: string,
		tx?: Prisma.TransactionClient,
	) {
		return await (tx || this.prismaService).userPrivacySettings.create({
			data: {
				user: { connect: { id: userId } },
			},
		});
	}
}
