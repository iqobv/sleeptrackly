import { Prisma } from '@generated/prisma/client';
import { FcmService } from '@infra/fcm/fcm.service';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { PaginationQueryDto } from '@libs/dto';
import { MessageResponse } from '@libs/types';
import { paginate } from '@libs/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { plainToInstance } from 'class-transformer';
import { filter, map, Observable, Subject } from 'rxjs';
import {
	CreateNotificationDto,
	NotificationDto,
	PaginatedNotificationDto,
	UpdateNotificationDto,
} from './dto';
import { SignalPayload, SseSignalEvent } from './interfaces';
import { getNotificationsForUserSql } from './sql';

@Injectable()
export class NotificationService {
	private readonly signalSubject = new Subject<SignalPayload>();

	constructor(
		private readonly prismaService: PrismaService,
		private readonly fcmService: FcmService,
	) {}

	public subscribeToSignals(userId: string): Observable<SseSignalEvent> {
		return this.signalSubject.asObservable().pipe(
			filter(
				(payload: SignalPayload) =>
					payload.userId === userId || payload.userId === null,
			),
			map((payload: SignalPayload) => ({
				data: {
					action: 'FETCH_NOTIFICATIONS',
					timestamp: payload.timestamp,
				},
				type: 'notification_signal',
			})),
		);
	}

	private emitSignal(userId: string | null): void {
		this.signalSubject.next({
			userId,
			timestamp: Date.now(),
		});
	}

	public async create(
		dto: CreateNotificationDto,
		tx?: Prisma.TransactionClient,
	): Promise<NotificationDto> {
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

		if (!notification.isScheduled && !notification.isPush) {
			this.emitSignal(notification.userId);
		}

		return plainToInstance(NotificationDto, notification);
	}

	public async getAllForUser(
		userId: string,
		query: PaginationQueryDto,
	): Promise<PaginatedNotificationDto> {
		const { page = 1, limit = 10 } = query;

		const result = await paginate<NotificationDto>(
			{ page, limit },
			async (limit, offset) => {
				const [total, items] = await this.prismaService.$transaction([
					this.prismaService.notification.count({
						where: {
							showInApp: true,
							isPush: false,
							isScheduled: false,
							isEmail: false,
							OR: [{ isGlobal: false, userId }, { isGlobal: true }],
						},
					}),
					this.prismaService.$queryRaw<NotificationDto[]>(
						getNotificationsForUserSql(userId, limit, offset),
					),
				]);

				return { items, total };
			},
		);

		return plainToInstance(PaginatedNotificationDto, result);
	}

	public async update(
		id: string,
		dto: UpdateNotificationDto,
	): Promise<NotificationDto> {
		const { isRead } = dto;

		const notification = await this.findById(id);

		const updated = await this.prismaService.notification.update({
			where: { id: notification.id },
			data: { isRead },
		});

		return plainToInstance(NotificationDto, updated);
	}

	public async markAllAsRead(userId: string): Promise<void> {
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

	public async remove(id: string): Promise<MessageResponse> {
		const notification = await this.findById(id);

		await this.prismaService.notification.delete({
			where: { id: notification.id },
		});

		return SUCCESS_MESSAGES.NOTIFICATION.DELETED;
	}

	public async sendPushNotification(): Promise<void> {
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
	private async handleScheduledNotifications(): Promise<void> {
		await this.sendPushNotification();
	}

	public async sendDirectPush(
		tokens: string[],
		title: string,
		body: string,
		redirectUrl: string,
	): Promise<void> {
		if (tokens.length === 0) return;

		await this.fcmService.sendNotification(tokens, {
			data: {
				title,
				body: body || '',
				url: redirectUrl ?? '/',
			},
		});
	}

	private async findById(id: string): Promise<NotificationDto> {
		const notification = await this.prismaService.notification.findUnique({
			where: { id },
		});

		if (!notification)
			throw new NotFoundException(ERROR_MESSAGES.NOTIFICATION.NOT_FOUND);

		return plainToInstance(NotificationDto, notification);
	}
}
