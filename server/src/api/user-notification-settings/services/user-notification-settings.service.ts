import { Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { NotificationService } from '../../notification/notification.service';
import {
	UpdateUserNotificationSettingsDto,
	UserNotificationSettingsDto,
} from '../dto';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class UserNotificationSettingsService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly notificationService: NotificationService,
	) {}

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

		return await this.prismaService.userNotificationSettings.update({
			where: { userId: existingSettings.userId },
			data: dto,
		});
	}
}
