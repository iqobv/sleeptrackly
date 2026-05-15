import { PrismaService } from '@infra/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from '../notification/notification.service';
import { UserNotificationSettingsService } from './user-notification-settings.service';

type PrismaMock = {
	userNotificationSettings: {
		create: jest.Mock;
		findUnique: jest.Mock;
		update: jest.Mock;
	};
};

describe('UserNotificationSettingsService', () => {
	let service: UserNotificationSettingsService;
	let prisma: PrismaMock;

	const notificationSettings = {
		id: 'notif_1',
		userId: 'user_1',
		isEmailNotificationsEnabled: true,
		isInAppNotificationsEnabled: true,
		isReminderEnabled: true,
		isUpdatesEnabled: true,
		isFriendRequestsEnabled: true,
		isAchievementUnlockedEnabled: true,
		reminderTime: '09:30',
		userTimeZone: 'America/New_York',
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	beforeEach(async () => {
		prisma = {
			userNotificationSettings: {
				create: jest.fn(),
				findUnique: jest.fn(),
				update: jest.fn(),
			},
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserNotificationSettingsService,
				{ provide: PrismaService, useValue: prisma },
				{ provide: NotificationService, useValue: {} },
			],
		}).compile();

		service = module.get<UserNotificationSettingsService>(
			UserNotificationSettingsService,
		);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('findByUserId', () => {
		it('should return user notification settings if found', async () => {
			prisma.userNotificationSettings.findUnique.mockResolvedValue(
				notificationSettings,
			);

			const result = await service.findByUserId('user_1');

			expect(result).toEqual(notificationSettings);
		});

		it('should return null if no settings found', async () => {
			prisma.userNotificationSettings.findUnique.mockResolvedValue(null);

			const result = await service.findByUserId('user_2');

			expect(result).toBeNull();
		});
	});

	describe('create', () => {
		it('should create and return new user notification settings', async () => {
			prisma.userNotificationSettings.findUnique.mockResolvedValue(null);
			prisma.userNotificationSettings.create.mockResolvedValue(
				notificationSettings,
			);

			const result = await service.create('user_1');

			expect(prisma.userNotificationSettings.create).toHaveBeenCalledWith({
				data: { user: { connect: { id: 'user_1' } } },
			});
			expect(result).toEqual(notificationSettings);
		});

		it('should return existing settings if they already exist', async () => {
			prisma.userNotificationSettings.findUnique.mockResolvedValue(
				notificationSettings,
			);

			const result = await service.create('user_1');
			expect(prisma.userNotificationSettings.create).not.toHaveBeenCalled();
			expect(result).toEqual(notificationSettings);
		});
	});

	describe('update', () => {
		const dto = {
			isEmailNotificationsEnabled: false,
			reminderTime: '10:00',
		};

		it('should update and return user notification settings', async () => {
			const updatedSettings = { ...notificationSettings, ...dto };

			prisma.userNotificationSettings.findUnique.mockResolvedValue(
				notificationSettings,
			);
			prisma.userNotificationSettings.update.mockResolvedValue(updatedSettings);

			const result = await service.update('user_1', dto);

			expect(prisma.userNotificationSettings.update).toHaveBeenCalledWith({
				where: { userId: 'user_1' },
				data: dto,
			});
			expect(result).toEqual(updatedSettings);
		});

		it('should create settings if none exist and then update', async () => {
			const createdSettings = { ...notificationSettings, userId: 'user_1' };
			const updatedSettings = { ...createdSettings, ...dto };

			prisma.userNotificationSettings.findUnique.mockResolvedValueOnce(null);
			prisma.userNotificationSettings.create.mockResolvedValue(createdSettings);
			prisma.userNotificationSettings.update.mockResolvedValue(updatedSettings);

			const result = await service.update('user_1', dto);

			expect(prisma.userNotificationSettings.create).toHaveBeenCalledWith({
				data: { user: { connect: { id: 'user_1' } } },
			});
			expect(prisma.userNotificationSettings.update).toHaveBeenCalledWith({
				where: { userId: 'user_1' },
				data: dto,
			});
			expect(result).toEqual(updatedSettings);
		});
	});
});
