import { NotificationPublisherService } from '@api/notification/services/notification-publisher.service';
import { PrismaService } from '@infra/prisma/prisma.service';
import { DATE_FORMAT } from '@libs/constants/date-format.constants';
import { appDayjs } from '@libs/utils/dayjs.util';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UserNotificationSettingsCronService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly notificationPublisherService: NotificationPublisherService,
	) {}

	private async sendReminderNotifications(): Promise<void> {
		const users = await this.prismaService.user.findMany({
			where: { deletedAt: null },
			select: {
				id: true,
				timezone: true,
				sleepStatus: { select: { isSleeping: true } },
				userFcmTokens: { select: { token: true } },
				notificationSettings: {
					where: {
						isReminderEnabled: true,
						reminderTime: { not: null },
					},
					select: {
						reminderTime: true,
					},
				},
			},
		});

		const nowUTC = appDayjs().utc();

		for (const user of users) {
			const { timezone, notificationSettings, sleepStatus, userFcmTokens } =
				user;

			const { reminderTime } = notificationSettings || {};

			if (!reminderTime) continue;

			if (!sleepStatus?.isSleeping) continue;

			const todayInUserTZ = appDayjs().tz(timezone).format(DATE_FORMAT);
			const userTargetTimeStr = `${todayInUserTZ} ${reminderTime}`;
			const targetTimeUTC = appDayjs.tz(userTargetTimeStr, timezone).utc();
			const targetMinute = targetTimeUTC.startOf('minute').valueOf();
			const nowMinute = nowUTC.startOf('minute').valueOf();

			if (targetMinute === nowMinute) {
				const fcmTokens = userFcmTokens.map((t) => t.token);

				if (fcmTokens.length > 0) {
					await this.notificationPublisherService.dispatchDirectPush({
						tokens: fcmTokens,
						title: 'Timer Reminder',
						body: "The sleep timer has started. Don't forget to turn it off when you wake up!",
						redirectUrl: '/timer',
					});
				}
			}
		}
	}

	@Cron(CronExpression.EVERY_MINUTE)
	private async handleSendReminderNotifications(): Promise<void> {
		await this.sendReminderNotifications();
	}
}
