import { Test, TestingModule } from '@nestjs/testing';
import { UserPrivacySettingsController } from './user-privacy-settings.controller';
import { UserPrivacySettingsService } from './user-privacy-settings.service';

type UserPrivacySettingsServiceMock = {
	getUserPrivacySettings: jest.Mock;
	updateUserPrivacySettings: jest.Mock;
};

describe('UserPrivacySettingsController', () => {
	let controller: UserPrivacySettingsController;
	let service: UserPrivacySettingsServiceMock;

	const userPrivacySettings = {
		id: 'id_1',
		userId: 'user_1',
		acceptFriendRequests: true,
		showActivity: true,
		profileVisibility: 'PUBLIC',
		achievementsVisibility: 'PRIVATE',
		statisticsVisibility: 'FRIENDS',
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	beforeEach(async () => {
		service = {
			getUserPrivacySettings: jest.fn(),
			updateUserPrivacySettings: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserPrivacySettingsController],
			providers: [
				UserPrivacySettingsService,
				{
					provide: UserPrivacySettingsService,
					useValue: service,
				},
			],
		}).compile();

		controller = module.get<UserPrivacySettingsController>(
			UserPrivacySettingsController,
		);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('getUserPrivacySettings', () => {
		it('should get user privacy settings', async () => {
			service.getUserPrivacySettings.mockResolvedValue(userPrivacySettings);

			const result = await controller.getUserPrivacySettings('user_1');

			expect(result).toEqual(userPrivacySettings);
		});
	});

	describe('updateUserPrivacySettings', () => {
		it('should update user privacy settings', async () => {
			service.updateUserPrivacySettings.mockResolvedValue(userPrivacySettings);

			const result = await controller.updateUserPrivacySettings('user_1', {
				acceptFriendRequests: false,
				showActivity: false,
			});

			expect(result).toEqual(userPrivacySettings);
		});
	});
});
