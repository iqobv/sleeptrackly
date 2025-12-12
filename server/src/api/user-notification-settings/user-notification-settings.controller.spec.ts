import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserNotificationSettingsDto } from './dto';
import { UserNotificationSettingsController } from './user-notification-settings.controller';
import { UserNotificationSettingsService } from './user-notification-settings.service';

type UserNotificationSettingsServiceMock = {
	findByUserId: jest.Mock;
	update: jest.Mock;
	create: jest.Mock;
};

describe('UserNotificationSettingsController', () => {
	let controller: UserNotificationSettingsController;
	let service: UserNotificationSettingsServiceMock;

	const mockSettings = {
		id: 'notif_setting_1',
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
		service = {
			findByUserId: jest.fn(),
			update: jest.fn(),
			create: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserNotificationSettingsController],
			providers: [
				{
					provide: UserNotificationSettingsService,
					useValue: service,
				},
			],
		}).compile();

		controller = module.get<UserNotificationSettingsController>(
			UserNotificationSettingsController,
		);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('get', () => {
		it('should return existing settings', async () => {
			service.findByUserId.mockResolvedValue(mockSettings);

			const userId = 'user_1';
			const result = await controller.getUserNotificationSettings(userId);

			expect(result).toEqual(mockSettings);
			expect(service.findByUserId).toHaveBeenCalledWith(userId);
		});
	});

	describe('update', () => {
		it('should update user notification settings', async () => {
			const dto: UpdateUserNotificationSettingsDto = {
				isEmailNotificationsEnabled: false,
				reminderTime: '10:00',
			};
			const updatedSettings = { ...mockSettings, ...dto };

			service.update.mockResolvedValue(updatedSettings);

			const userId = 'user_1';
			const result = await controller.update(userId, dto);

			expect(result).toEqual(updatedSettings);
			expect(service.update).toHaveBeenCalledWith(userId, dto);
		});
	});
});
