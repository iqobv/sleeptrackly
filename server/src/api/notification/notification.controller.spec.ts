import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

type NotificationServiceMock = {
	create: jest.Mock;
	getAllForUser: jest.Mock;
	update: jest.Mock;
	markAllAsRead: jest.Mock;
	remove: jest.Mock;
};

describe('NotificationController', () => {
	let controller: NotificationController;
	let service: NotificationServiceMock;

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
		service = {
			create: jest.fn(),
			getAllForUser: jest.fn(),
			update: jest.fn(),
			markAllAsRead: jest.fn(),
			remove: jest.fn(),
		};

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
			};

			const result = await controller.create(dto);

			expect(result).toEqual(notification);
			expect(service.create).toHaveBeenCalledWith(dto);
		});
	});

	describe('getAllForUser', () => {
		it('should get all notifications for the user', async () => {
			service.getAllForUser.mockResolvedValue([notification]);

			const userId = 'user_1';
			const query = { page: 1, limit: 10 };

			const result = await controller.getAllForUser(userId, query);

			expect(result).toEqual([notification]);
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
			expect(result).toEqual(notification);
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
			service.markAllAsRead.mockResolvedValue([notification]);

			const userId = 'user_1';
			const result = await controller.markAllAsRead(userId);

			expect(service.markAllAsRead).toHaveBeenCalledWith(userId);
			expect(result).toEqual([notification]);
		});
	});

	describe('remove', () => {
		it('should remove a notification by ID', async () => {
			service.remove.mockResolvedValue(true);

			const id = 'notif_1';
			const result = await controller.remove(id);

			expect(service.remove).toHaveBeenCalledWith(id);
			expect(result).toBe(true);
		});
	});
});
