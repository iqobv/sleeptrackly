import { Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BaseUserPrivacySettingsDto, UpdateUserPrivacySettings } from './dto';

@Injectable()
export class UserPrivacySettingsService {
	constructor(private readonly prismaService: PrismaService) {}

	public async updateUserPrivacySettings(
		userId: string,
		dto: UpdateUserPrivacySettings,
	): Promise<BaseUserPrivacySettingsDto> {
		const result = await this.prismaService.userPrivacySettings.upsert({
			where: { userId },
			create: {
				...dto,
				user: { connect: { id: userId } },
			},
			update: dto,
		});

		return plainToInstance(BaseUserPrivacySettingsDto, result);
	}

	public async getUserPrivacySettings(
		userId: string,
	): Promise<BaseUserPrivacySettingsDto> {
		const userPrivacySettings =
			await this.prismaService.userPrivacySettings.findUnique({
				where: { userId },
			});

		if (!userPrivacySettings) {
			return await this.createUserPrivacySettings(userId);
		}

		return plainToInstance(BaseUserPrivacySettingsDto, userPrivacySettings);
	}

	public async createUserPrivacySettings(
		userId: string,
		tx?: Prisma.TransactionClient,
	): Promise<BaseUserPrivacySettingsDto> {
		const prisma = tx ?? this.prismaService;

		return await prisma.userPrivacySettings.create({
			data: {
				user: { connect: { id: userId } },
			},
		});
	}
}
