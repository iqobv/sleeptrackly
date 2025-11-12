import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { UserFcmTokenService } from './user-fcm-token.service';

const fcmToken = {
	id: 'fcmtoken123',
	userId: 'user123',
	token: 'fcm_token_abc',
	userAgent: 'Mozilla/5.0',
	createdAt: new Date(),
	updatedAt: new Date(),
};

describe('UserFcmTokenService', () => {
	let service: UserFcmTokenService;
	let prisma: {
		userFcmToken: {
			upsert: jest.Mock;
			findMany: jest.Mock;
		};
	};

	beforeEach(async () => {
		prisma = {
			userFcmToken: {
				upsert: jest.fn(),
				findMany: jest.fn(),
			},
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserFcmTokenService,
				{
					provide: PrismaService,
					useValue: prisma,
				},
			],
		}).compile();

		service = module.get<UserFcmTokenService>(UserFcmTokenService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {
		it('should create or update a user FCM token', async () => {
			prisma.userFcmToken.upsert.mockResolvedValue(fcmToken);

			const userId = 'user123';
			const userAgent = 'Mozilla/5.0';

			const dto = { token: 'fcm_token_abc' };

			const result = await service.create(userId, dto, userAgent);

			expect(prisma.userFcmToken.upsert).toHaveBeenCalledWith({
				where: { token: dto.token },
				update: {
					userAgent,
					userId,
				},
				create: {
					userId,
					token: dto.token,
					userAgent,
				},
			});

			expect(result).toEqual(fcmToken);
		});
	});
});
