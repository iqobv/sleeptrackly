import { Test, TestingModule } from '@nestjs/testing';
import { UserFcmTokenController } from './user-fcm-token.controller';
import { UserFcmTokenService } from './user-fcm-token.service';

describe('UserFcmTokenController', () => {
	let controller: UserFcmTokenController;
	let service: {
		create: jest.Mock;
	};

	const fcmToken = {
		id: 'fcmtoken123',
		userId: 'user123',
		token: 'fcm_token_abc',
		userAgent: 'Mozilla/5.0',
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	beforeEach(async () => {
		service = {
			create: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserFcmTokenController],
			providers: [
				UserFcmTokenService,
				{
					provide: UserFcmTokenService,
					useValue: service,
				},
			],
		}).compile();

		controller = module.get<UserFcmTokenController>(UserFcmTokenController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('saveFcmToken', () => {
		it('should save FCM token for the user', async () => {
			service.create.mockResolvedValue(fcmToken);

			const userId = 'user123';
			const dto = { token: 'fcm_token_abc' };
			const userAgent = 'Mozilla/5.0';

			const result = await controller.saveFcmToken(userId, dto, userAgent);

			expect(service.create).toHaveBeenCalledWith(userId, dto, userAgent);
			expect(result).toEqual(fcmToken);
		});
	});
});
