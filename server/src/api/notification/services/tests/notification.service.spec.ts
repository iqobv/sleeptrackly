import { NotificationDto } from '@api/notification/dto/notification.dto';
import { Notification } from '@generated/prisma/client';
import { NotificationType } from '@generated/prisma/enums';
import { FcmService } from '@infra/fcm/fcm.service';
import { PrismaService } from '@infra/prisma/prisma.service';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import { prismaMock } from '@libs/prisma/prisma.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { mock, mockReset } from 'jest-mock-extended';
import { NotificationService } from '../notification.service';

describe('NotificationService', () => {
	let service: NotificationService;
	let fcmService = mock<FcmService>();

	const notification: Notification = {
		id: 'notif_1',
		userId: 'user_1',
		isGlobal: false,
		isRead: false,
		isPush: false,
		showInApp: true,
		isScheduled: false,
		isEmail: false,
		title: 'Test Notification',
		body: 'This is a test notification.',
		redirectUrl: '/dashboard',
		scheduledAt: new Date(),
		createdAt: new Date(),
		updatedAt: new Date(),
		achievementId: null,
		type: NotificationType.OTHER,
		challengeId: null,
		weeklySleepSummaryId: null,
	};

	beforeEach(async () => {
		mockReset(prismaMock);
		mockReset(fcmService);

		prismaMock.$transaction.mockImplementation(async (cb) => cb(prismaMock));

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				NotificationService,
				{ provide: PrismaService, useValue: prismaMock },
				{ provide: FcmService, useValue: fcmService },
			],
		}).compile();

		service = module.get<NotificationService>(NotificationService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {
		it('should create a notification', async () => {
			prismaMock.notification.create.mockResolvedValue(notification);

			const dto = {
				isGlobal: false,
				isPush: false,
				showInApp: true,
				type: NotificationType.OTHER,
				isEmail: false,
				title: 'Test Notification',
				body: 'This is a test notification.',
				redirectUrl: '/dashboard',
				scheduledAt: new Date(),
			};

			const result = await service.create(dto);

			expect(prismaMock.notification.create).toHaveBeenCalledWith({
				data: {
					...dto,
					isScheduled: true,
				},
			});
			expect(result).toBeInstanceOf(NotificationDto);
			expect(result).toMatchObject({
				id: 'notif_1',
				title: 'Test Notification',
			});
		});
	});

	describe('getAllForUser', () => {
		it('should get all notifications for a user with pagination', async () => {
			const notifications = [notification];
			const total = 1;

			prismaMock.$transaction.mockResolvedValue([total, notifications]);

			const userId = 'user_1';
			const query = { page: 1, limit: 10 };

			const result = await service.getAllForUser(userId, query);

			expect(prismaMock.$transaction).toHaveBeenCalled();
			expect(result).toHaveProperty('items');
			expect(result.items[0]).toBeInstanceOf(NotificationDto);
			expect(result.meta).toEqual({
				total: 1,
				page: 1,
				pageSize: 10,
				totalPages: 1,
			});
		});
	});

	describe('update', () => {
		it('should update a notification', async () => {
			const updatedNotification = { ...notification, isRead: true };

			prismaMock.notification.findUnique.mockResolvedValue(notification);
			prismaMock.notification.update.mockResolvedValue(updatedNotification);

			const result = await service.update(notification.id, { isRead: true });

			expect(prismaMock.notification.findUnique).toHaveBeenCalledWith({
				where: { id: notification.id },
			});
			expect(prismaMock.notification.update).toHaveBeenCalledWith({
				where: { id: notification.id },
				data: { isRead: true },
			});
			expect(result).toBeInstanceOf(NotificationDto);
			expect(result).toMatchObject({ isRead: true });
		});

		it('should mark all notifications as read for a user', async () => {
			prismaMock.notification.updateMany.mockResolvedValue({ count: 5 });
			prismaMock.notification.findMany.mockResolvedValue([]);
			prismaMock.globalNotificationRead.createMany.mockResolvedValue({
				count: 0,
			});

			const userId = 'user_1';
			await service.markAllAsRead(userId);

			expect(prismaMock.notification.updateMany).toHaveBeenCalledWith({
				where: { userId, isRead: false, isGlobal: false },
				data: { isRead: true },
			});
		});
	});

	describe('delete', () => {
		it('should delete a notification', async () => {
			prismaMock.notification.findUnique.mockResolvedValue(notification);
			prismaMock.notification.delete.mockResolvedValue(notification);

			const result = await service.remove(notification.id);

			expect(prismaMock.notification.findUnique).toHaveBeenCalledWith({
				where: { id: notification.id },
			});
			expect(prismaMock.notification.delete).toHaveBeenCalledWith({
				where: { id: notification.id },
			});
			expect(result).toEqual(SUCCESS_MESSAGES.NOTIFICATION.DELETED);
		});
	});
});
