import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';
import { UpdateUserNotificationSettingsDto } from './dto';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class UserNotificationSettingsService {
	readonly LOGGER: Logger = new Logger(UserNotificationSettingsService.name);

	constructor(
		private readonly prismaService: PrismaService,
		private readonly notificationService: NotificationService,
	) {}

	async findByUserId(userId: string) {
		return await this.prismaService.userNotificationSettings.findUnique({
			where: { userId },
		});
	}

	async create(userId: string) {
		const existingSettings = await this.findByUserId(userId);

		if (existingSettings) return existingSettings;

		const settings = await this.prismaService.userNotificationSettings.create({
			data: {
				user: { connect: { id: userId } },
			},
		});

		return settings;
	}

	async update(userId: string, dto: UpdateUserNotificationSettingsDto) {
		let existingSettings = await this.findByUserId(userId);

		if (!existingSettings) existingSettings = await this.create(userId);

		return await this.prismaService.userNotificationSettings.update({
			where: { userId: existingSettings.userId },
			data: dto,
		});
	}

	private async sendReminderNotifications() {
		const reminderSettings =
			await this.prismaService.userNotificationSettings.findMany({
				where: {
					isReminderEnabled: true,
					reminderTime: { not: null },
					userTimeZone: { not: null },
				},
				select: {
					userId: true,
					reminderTime: true,
					userTimeZone: true,
					user: {
						select: {
							userFcmTokens: { select: { token: true } },
							sleepStatus: { select: { isSleeping: true } },
						},
					},
				},
			});

		const nowUTC = dayjs().utc();

		for (const setting of reminderSettings) {
			const { userId, reminderTime, userTimeZone } = setting;

			if (!reminderTime || !userTimeZone) continue;

			if (!setting.user.sleepStatus?.isSleeping) continue;

			const todayInUserTZ = dayjs().tz(userTimeZone).format('YYYY-MM-DD');
			const userTargetTimeStr = `${todayInUserTZ} ${reminderTime}`;
			const targetTimeUTC = dayjs.tz(userTargetTimeStr, userTimeZone).utc();
			const targetMinute = targetTimeUTC.startOf('minute').valueOf();
			const nowMinute = nowUTC.startOf('minute').valueOf();

			if (targetMinute === nowMinute) {
				const fcmTokens = setting.user.userFcmTokens.map((t) => t.token);

				if (fcmTokens.length > 0) {
					await this.notificationService.sendDirectPush(
						fcmTokens,
						'Timer Reminder',
						"Your sleep timer is set. Don't forget to stop it when you wake up!",
						'/timer',
					);
				}
			}
		}
	}

	@Cron(CronExpression.EVERY_MINUTE)
	async handleSendReminderNotifications() {
		await this.sendReminderNotifications();
	}
}
