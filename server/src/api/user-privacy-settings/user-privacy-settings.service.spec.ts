import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { UserPrivacySettingsService } from './user-privacy-settings.service';

type PrismaMock = {
	userPrivacySettings: {
		create: jest.Mock;
		findUnique: jest.Mock;
		update: jest.Mock;
	};
};

describe('UserPrivacySettingsService', () => {
	let service: UserPrivacySettingsService;
	let prisma: PrismaMock;

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
		prisma = {
			userPrivacySettings: {
				create: jest.fn(),
				findUnique: jest.fn(),
				update: jest.fn(),
			},
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserPrivacySettingsService,
				{ provide: PrismaService, useValue: prisma },
			],
		}).compile();

		service = module.get<UserPrivacySettingsService>(
			UserPrivacySettingsService,
		);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('updateUserPrivacySettings', () => {
		it('should update user privacy settings', async () => {
			prisma.userPrivacySettings.findUnique.mockResolvedValue(
				userPrivacySettings,
			);
			prisma.userPrivacySettings.update.mockResolvedValue(userPrivacySettings);

			const dto = {
				acceptFriendRequests: false,
				showActivity: false,
			};

			const result = await service.updateUserPrivacySettings('user_1', dto);

			expect(prisma.userPrivacySettings.update).toHaveBeenCalledWith({
				where: { id: 'id_1', userId: 'user_1' },
				data: dto,
			});
			expect(result).toEqual(userPrivacySettings);
		});
	});

	describe('getUserPrivacySettings', () => {
		it('should get user privacy settings', async () => {
			prisma.userPrivacySettings.findUnique.mockResolvedValue(
				userPrivacySettings,
			);

			const result = await service.getUserPrivacySettings('user_1');

			expect(prisma.userPrivacySettings.findUnique).toHaveBeenCalledWith({
				where: { userId: 'user_1' },
			});
			expect(result).toEqual(userPrivacySettings);
		});

		it('should create user privacy settings if they do not exist', async () => {
			prisma.userPrivacySettings.findUnique.mockResolvedValue(null);
			prisma.userPrivacySettings.create.mockResolvedValue(userPrivacySettings);

			const result = await service.getUserPrivacySettings('user_1');

			expect(prisma.userPrivacySettings.create).toHaveBeenCalledWith({
				data: {
					user: { connect: { id: 'user_1' } },
				},
			});
			expect(result).toEqual(userPrivacySettings);
		});
	});
});
