import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import dayjs from 'dayjs';
import { UserSanctionType } from 'generated/prisma/enums';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';
import { UserAvatarService } from '../user-avatar/user-avatar.service';
import { UserService } from '../user/user.service';
import { UserSanctionService } from './user-sanction.service';

type PrismaMock = {
	userSanction: {
		findMany: jest.Mock;
		findUnique: jest.Mock;
		create: jest.Mock;
		update: jest.Mock;
		delete: jest.Mock;
	};
};

describe('UserSanctionService', () => {
	let service: UserSanctionService;
	let prisma: PrismaMock;
	let userService: { update: jest.Mock; generateUsername: jest.Mock };
	let userAvatarService: { deleteAvatar: jest.Mock };
	let notificationService: { create: jest.Mock; send: jest.Mock };

	const now = new Date();
	const sanction = {
		id: 'sanction-1',
		userId: 'u1',
		reportId: 'rep1',
		createdById: 'admin1',
		startsAt: now,
		endsAt: dayjs(now).add(1, 'hour').toDate(),
		type: UserSanctionType.AVATAR_CHANGE_BAN,
		createdAt: now,
		updatedAt: now,
	};

	beforeEach(async () => {
		prisma = {
			userSanction: {
				findMany: jest.fn(),
				findUnique: jest.fn(),
				create: jest.fn(),
				update: jest.fn(),
				delete: jest.fn(),
			},
		};

		userService = {
			update: jest.fn(),
			generateUsername: jest.fn().mockResolvedValue('generated-username'),
		};

		userAvatarService = {
			deleteAvatar: jest.fn(),
		};

		notificationService = {
			create: jest.fn().mockResolvedValue({}),
			send: jest.fn().mockResolvedValue(true),
		};

		const moduleRef: TestingModule = await Test.createTestingModule({
			providers: [
				UserSanctionService,
				{ provide: PrismaService, useValue: prisma },
				{ provide: UserService, useValue: userService },
				{ provide: UserAvatarService, useValue: userAvatarService },
				{ provide: NotificationService, useValue: notificationService },
			],
		}).compile();

		service = moduleRef.get<UserSanctionService>(UserSanctionService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('findByUserId', () => {
		it('should return sanctions by user id', async () => {
			prisma.userSanction.findMany.mockResolvedValue([sanction]);

			const result = await service.findByUserId('u1');

			expect(prisma.userSanction.findMany).toHaveBeenCalledWith({
				where: { userId: 'u1' },
			});
			expect(result).toEqual([sanction]);
		});
	});

	describe('findById', () => {
		it('should return sanction by id', async () => {
			prisma.userSanction.findUnique.mockResolvedValue(sanction);

			const result = await service.findById('sanction-1');

			expect(prisma.userSanction.findUnique).toHaveBeenCalledWith({
				where: { id: 'sanction-1' },
			});
			expect(result).toEqual(sanction);
		});

		it('should throw error if sanction not found', async () => {
			prisma.userSanction.findUnique.mockResolvedValue(null);

			await expect(service.findById('wrong-id')).rejects.toThrow(
				NotFoundException,
			);
		});
	});

	describe('create', () => {
		it('should create sanction and handle AVATAR_CHANGE_BAN', async () => {
			prisma.userSanction.create.mockResolvedValue(sanction);
			jest
				.spyOn(
					service as unknown as { findByTypeAndUserId: () => Promise<unknown> },
					'findByTypeAndUserId',
				)
				.mockResolvedValue(null);

			const endsAt = dayjs(now).add(1, 'hour').toDate();

			const result = await service.create('u1', {
				targetUserId: 'u2',
				type: UserSanctionType.AVATAR_CHANGE_BAN,
				endsAt,
				startsAt: now,
				reportId: 'rep1',
			});

			expect(prisma.userSanction.create).toHaveBeenCalled();
			expect(userAvatarService.deleteAvatar).toHaveBeenCalledWith('u2');
			expect(result).toEqual(sanction);
		});

		it('should handle USERNAME_CHANGE_BAN and generate new username', async () => {
			prisma.userSanction.create.mockResolvedValue({
				...sanction,
				type: UserSanctionType.USERNAME_CHANGE_BAN,
			});
			jest
				.spyOn(
					service as unknown as { findByTypeAndUserId: () => Promise<unknown> },
					'findByTypeAndUserId',
				)
				.mockResolvedValue(null);

			await service.create('admin-1', {
				targetUserId: 'target-1',
				type: UserSanctionType.USERNAME_CHANGE_BAN,
				startsAt: now,
				endsAt: dayjs(now).add(1, 'day').toDate(),
			});

			expect(userService.generateUsername).toHaveBeenCalled();
			expect(userService.update).toHaveBeenCalledWith(
				'target-1',
				{ username: 'generated-username' },
				true,
			);
		});

		it('should throw error if start date is after end date', async () => {
			const dto = {
				targetUserId: 'target-1',
				type: UserSanctionType.AVATAR_CHANGE_BAN,
				startsAt: dayjs(now).add(2, 'hour').toDate(),
				endsAt: dayjs(now).add(1, 'hour').toDate(),
			};

			await expect(service.create('admin-1', dto)).rejects.toThrow(
				BadRequestException,
			);
		});

		it('should throw error if end date is in the past', async () => {
			const dto = {
				targetUserId: 'target-1',
				type: UserSanctionType.AVATAR_CHANGE_BAN,
				startsAt: dayjs(now).subtract(2, 'hour').toDate(),
				endsAt: dayjs(now).subtract(1, 'hour').toDate(),
			};

			await expect(service.create('admin-1', dto)).rejects.toThrow(
				BadRequestException,
			);
		});
	});

	describe('update', () => {
		it('should update sanction successfully', async () => {
			prisma.userSanction.findUnique.mockResolvedValue(sanction);
			const newEndsAt = dayjs(now).add(2, 'hours').toDate();
			prisma.userSanction.update.mockResolvedValue({
				...sanction,
				endsAt: newEndsAt,
			});

			const result = await service.update(sanction.id, { endsAt: newEndsAt });

			expect(prisma.userSanction.update).toHaveBeenCalledWith({
				where: { id: sanction.id },
				data: { endsAt: newEndsAt },
			});
			expect(result.endsAt).toEqual(newEndsAt);
		});
	});

	describe('remove', () => {
		it('should remove sanction', async () => {
			prisma.userSanction.findUnique.mockResolvedValue(sanction);
			prisma.userSanction.delete.mockResolvedValue(sanction);

			await service.remove(sanction.id);

			expect(prisma.userSanction.delete).toHaveBeenCalledWith({
				where: { id: sanction.id },
			});
		});

		it('should throw error if removing non-existent sanction', async () => {
			prisma.userSanction.findUnique.mockResolvedValue(null);

			await expect(service.remove('s1')).rejects.toThrow(NotFoundException);
		});
	});
});
