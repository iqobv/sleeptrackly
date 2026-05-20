import { Prisma } from '@generated/prisma/client';
import { FcmService } from '@infra/fcm/fcm.service';
import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
	CreateNotificationDto,
	NotificationQueryDto,
	UpdateNotificationDto,
} from './dto';
import { getNotificationsForUserSql } from './sql';

@Injectable()
export class NotificationService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly fcmService: FcmService,
	) {}

	async create(dto: CreateNotificationDto, tx?: Prisma.TransactionClient) {
		const { isPush, scheduledAt, ...rest } = dto;

		const prisma = tx ?? this.prismaService;

		const notification = await prisma.notification.create({
			data: {
				isPush,
				isScheduled: !!scheduledAt,
				scheduledAt,
				...rest,
			},
		});

		return notification;
	}

	async getAllForUser(userId: string, query: NotificationQueryDto) {
		const { page = 1, limit = 10 } = query;

		const safePage = Math.max(Number(page) || 1, 1);
		const safeSize = Math.max(Number(limit) || 10, 1);
		const offset = (safePage - 1) * safeSize;

		const items = await this.prismaService.$queryRaw(
			getNotificationsForUserSql(userId, safeSize, offset),
		);

		const total = await this.prismaService.notification.count({
			where: {
				showInApp: true,
				isPush: false,
				isScheduled: false,
				isEmail: false,
				OR: [{ isGlobal: false, userId }, { isGlobal: true }],
			},
		});

		return {
			items,
			meta: {
				total,
				page: safePage,
				pageSize: safeSize,
				totalPages: Math.ceil(total / safeSize),
			},
		};
	}

	async update(id: string, dto: UpdateNotificationDto) {
		const { isRead } = dto;

		const notification = await this.findById(id);

		return await this.prismaService.notification.update({
			where: { id: notification.id },
			data: { isRead },
		});
	}

	async markAllAsRead(userId: string) {
		await this.prismaService.notification.updateMany({
			where: {
				userId,
				isGlobal: false,
				isRead: false,
			},
			data: { isRead: true },
		});

		const globals = await this.prismaService.notification.findMany({
			where: {
				isGlobal: true,
				showInApp: true,
			},
			select: { id: true },
		});

		await this.prismaService.globalNotificationRead.createMany({
			data: globals.map((n) => ({
				userId,
				notificationId: n.id,
				readAt: new Date(),
			})),
			skipDuplicates: true,
		});
	}

	async remove(id: string) {
		const notification = await this.findById(id);

		await this.prismaService.notification.delete({
			where: { id: notification.id },
		});

		return true;
	}

	async sendPushNotification() {
		const notifications = await this.prismaService.notification.findMany({
			where: {
				isPush: true,
				isScheduled: true,
				scheduledAt: { lte: new Date() },
			},
		});

		for (const notification of notifications) {
			if (notification.userId) {
				const { userId, body, title, redirectUrl } = notification;

				const fcmTokens = await this.prismaService.userFcmToken.findMany({
					where: { userId },
					select: { token: true },
				});

				await this.fcmService.sendNotification(
					fcmTokens.map((t) => t.token),
					{
						notification: {
							title,
							...(!!body && { body }),
						},
						data: {
							url: redirectUrl ?? '/',
						},
					},
				);
			}
		}
	}

	@Cron(CronExpression.EVERY_MINUTE)
	async handleScheduledNotifications() {
		await this.sendPushNotification();
	}

	async sendDirectPush(
		tokens: string[],
		title: string,
		body: string,
		redirectUrl: string,
	) {
		if (tokens.length === 0) return;

		await this.fcmService.sendNotification(tokens, {
			data: {
				title,
				body: body || '',
				url: redirectUrl ?? '/',
			},
		});
	}

	private async findById(id: string) {
		const notification = await this.prismaService.notification.findUnique({
			where: { id },
		});

		if (!notification) throw new NotFoundException('Notification not found');

		return notification;
	}
}
