import { NotificationService } from '@api/notification/notification.service';
import { PrismaService } from '@infra/prisma/prisma.service';
import { DATE_FORMAT } from '@libs/constants/date-format.constants';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class UserNotificationSettingsCronService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly notificationService: NotificationService,
	) {}

	private async sendReminderNotifications(): Promise<void> {
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
			const { reminderTime, userTimeZone } = setting;

			if (!reminderTime || !userTimeZone) continue;

			if (!setting.user.sleepStatus?.isSleeping) continue;

			const todayInUserTZ = dayjs().tz(userTimeZone).format(DATE_FORMAT);
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
	private async handleSendReminderNotifications(): Promise<void> {
		await this.sendReminderNotifications();
	}
}
