import { Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UpdateUserNotificationSettingsDto } from '../dto/update-user-notification-settings.dto';
import { UserNotificationSettingsDto } from '../dto/user-notification-settings.dto';

@Injectable()
export class UserNotificationSettingsService {
	constructor(private readonly prismaService: PrismaService) {}

	public async findOrCreate(
		userId: string,
		tx?: Prisma.TransactionClient,
	): Promise<UserNotificationSettingsDto> {
		const userSettings =
			await this.prismaService.userNotificationSettings.findUnique({
				where: { userId },
			});

		if (!userSettings) return await this.saveToDb(userId, tx);

		return plainToInstance(UserNotificationSettingsDto, userSettings);
	}

	public async saveToDb(
		userId: string,
		tx?: Prisma.TransactionClient,
	): Promise<UserNotificationSettingsDto> {
		const prisma = tx || this.prismaService;

		const settings = await prisma.userNotificationSettings.create({
			data: {
				user: { connect: { id: userId } },
			},
		});

		return settings;
	}

	public async update(
		userId: string,
		dto: UpdateUserNotificationSettingsDto,
	): Promise<UserNotificationSettingsDto> {
		const existingSettings = await this.findOrCreate(userId);

		const updated = await this.prismaService.userNotificationSettings.update({
			where: { userId: existingSettings.userId },
			data: dto,
		});

		return plainToInstance(UserNotificationSettingsDto, updated);
	}
}
