import { Test, TestingModule } from '@nestjs/testing';
import { FcmService } from 'src/infra/fcm/fcm.service';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { NotificationService } from './notification.service';

type PrismaMock = {
	notification: {
		create: jest.Mock;
		findMany: jest.Mock;
		findById: jest.Mock;
		findUnique: jest.Mock;
		count: jest.Mock;
		delete: jest.Mock;
		update: jest.Mock;
		updateMany: jest.Mock;
	};
	userFcmToken: {
		findMany: jest.Mock;
	};
	$transaction: jest.Mock;
};

type FcmMock = {
	sendNotification: jest.Mock;
};

describe('NotificationService', () => {
	let service: NotificationService;
	let prisma: PrismaMock;
	let fcmService: FcmMock;

	const notification = {
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
	};

	beforeEach(async () => {
		fcmService = {
			sendNotification: jest.fn().mockResolvedValue({}),
		};

		prisma = {
			notification: {
				create: jest.fn(),
				findMany: jest.fn(),
				findById: jest.fn(),
				findUnique: jest.fn(),
				count: jest.fn(),
				delete: jest.fn(),
				update: jest.fn(),
				updateMany: jest.fn(),
			},
			userFcmToken: {
				findMany: jest.fn(),
			},
			$transaction: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				NotificationService,
				{ provide: PrismaService, useValue: prisma },
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
			prisma.notification.create.mockResolvedValue(notification);

			const dto = {
				isGlobal: false,
				isPush: false,
				showInApp: true,
				isScheduled: false,
				isEmail: false,
				title: 'Test Notification',
				body: 'This is a test notification.',
				redirectUrl: '/dashboard',
				scheduledAt: new Date(),
				user: {
					connect: { id: 'user_1' },
				},
			};

			const result = await service.create(dto);

			expect(prisma.notification.create).toHaveBeenCalledWith({
				data: dto,
			});
			expect(result).toEqual(notification);
		});
	});

	describe('getAllForUser', () => {
		it('should get all notifications for a user with pagination', async () => {
			const notifications = [notification];
			const total = 1;
			prisma.$transaction.mockResolvedValue([notifications, total]);

			const userId = 'user_1';
			const query = { page: 1, limit: 10 };

			const result = await service.getAllForUser(userId, query);
			expect(prisma.$transaction).toHaveBeenCalled();
			expect(result).toEqual({
				items: notifications,
				meta: {
					total,
					page: 1,
					pageSize: 10,
					totalPages: 1,
				},
			});
		});
	});

	describe('update', () => {
		it('should update a notification', async () => {
			const updatedNotification = { ...notification, isRead: true };
			prisma.notification.findUnique.mockResolvedValue(notification);
			prisma.notification.update.mockResolvedValue(updatedNotification);

			const result = await service.update(notification.id, { isRead: true });

			expect(prisma.notification.findUnique).toHaveBeenCalledWith({
				where: { id: notification.id },
			});
			expect(prisma.notification.update).toHaveBeenCalledWith({
				where: { id: notification.id },
				data: { isRead: true },
			});
			expect(result).toEqual(updatedNotification);
		});

		it('should throw an error if notification not found', async () => {
			prisma.notification.findUnique.mockResolvedValue(null);

			await expect(
				service.update('nonexistent_id', { isRead: true }),
			).rejects.toThrow('Notification not found');
		});

		it('should mark all notifications as read for a user', async () => {
			prisma.notification.updateMany.mockResolvedValue({ count: 5 });

			const userId = 'user_1';
			const result = await service.markAllAsRead(userId);
			expect(prisma.notification.updateMany).toHaveBeenCalledWith({
				where: { userId, isRead: false },
				data: { isRead: true },
			});
			expect(result).toEqual({ count: 5 });
		});
	});

	describe('delete', () => {
		it('should delete a notification', async () => {
			prisma.notification.findUnique.mockResolvedValue(notification);
			prisma.notification.delete.mockResolvedValue(notification);

			const result = await service.remove(notification.id);

			expect(prisma.notification.findUnique).toHaveBeenCalledWith({
				where: { id: notification.id },
			});
			expect(prisma.notification.delete).toHaveBeenCalledWith({
				where: { id: notification.id },
			});
			expect(result).toBe(true);
		});

		it('should throw NotFound if notification does not exist', async () => {
			prisma.notification.findUnique.mockResolvedValue(null);

			await expect(service.remove('bad_id')).rejects.toThrow(
				'Notification not found',
			);
			expect(prisma.notification.delete).not.toHaveBeenCalled();
		});
	});
});
