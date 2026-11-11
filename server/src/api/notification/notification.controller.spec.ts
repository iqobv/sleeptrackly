import { NotificationType } from '@generated/prisma/enums';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import { PaginatedDataDto } from '@libs/dto/paginated-data.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { mock, mockReset } from 'jest-mock-extended';
import { NotificationDto } from './dto/notification.dto';
import { NotificationController } from './notification.controller';
import { NotificationService } from './services/notification.service';

describe('NotificationController', () => {
	let controller: NotificationController;
	let service = mock<NotificationService>();

	const notification: NotificationDto = {
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
		type: NotificationType.OTHER,
		achievementId: null,
		challengeId: null,
		weeklySleepSummaryId: null,
	};

	const paginatedNotifications: PaginatedDataDto<NotificationDto> = {
		items: [notification],
		meta: {
			page: 1,
			pageSize: 10,
			total: 1,
			totalPages: 1,
		},
	};

	beforeEach(async () => {
		mockReset(service);

		const module: TestingModule = await Test.createTestingModule({
			controllers: [NotificationController],
			providers: [
				NotificationService,
				{
					provide: NotificationService,
					useValue: service,
				},
			],
		}).compile();

		controller = module.get<NotificationController>(NotificationController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('create', () => {
		it('should create a new notification', async () => {
			service.create.mockResolvedValue(notification);

			const dto = {
				userId: 'user_1',
				isGlobal: false,
				isPush: false,
				showInApp: true,
				title: 'Test Notification',
				body: 'This is a test notification.',
				redirectUrl: '/dashboard',
				scheduledAt: new Date(),
				type: NotificationType.OTHER,
			};

			const result = await controller.create(dto);

			expect(result).toMatchObject(notification);
			expect(service.create).toHaveBeenCalledWith(dto);
		});
	});

	describe('getAllForUser', () => {
		it('should get all notifications for the user', async () => {
			service.getAllForUser.mockResolvedValue(paginatedNotifications);

			const userId = 'user_1';
			const query = { page: 1, limit: 10 };

			const result = await controller.getAllForUser(userId, query);

			expect(result).toMatchObject(paginatedNotifications);
			expect(service.getAllForUser).toHaveBeenCalledWith(userId, query);
		});
	});

	describe('update', () => {
		it('should update a notification', async () => {
			service.update.mockResolvedValue(notification);

			const id = 'notif_1';
			const dto = { isRead: true };

			const result = await controller.update(id, dto);

			expect(service.update).toHaveBeenCalledWith(id, dto);
			expect(result).toMatchObject(notification);
		});

		it('should throw an error if notification not found', async () => {
			service.update.mockRejectedValue(new Error('Notification not found'));

			const id = 'invalid_id';
			const dto = { isRead: true };

			await expect(controller.update(id, dto)).rejects.toThrow(
				'Notification not found',
			);
		});

		it('should mark all notifications as read for the user', async () => {
			const userId = 'user_1';
			const result = await controller.markAllAsRead(userId);

			expect(service.markAllAsRead).toHaveBeenCalledWith(userId);
			expect(result).toEqual(SUCCESS_MESSAGES.NOTIFICATION.MARKED_ALL_AS_READ);
		});
	});

	describe('remove', () => {
		it('should remove a notification by ID', async () => {
			service.remove.mockResolvedValue(SUCCESS_MESSAGES.NOTIFICATION.DELETED);

			const id = 'notif_1';
			const result = await controller.remove(id);

			expect(service.remove).toHaveBeenCalledWith(id);
			expect(result).toEqual(SUCCESS_MESSAGES.NOTIFICATION.DELETED);
		});
	});
});
