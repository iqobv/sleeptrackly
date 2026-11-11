import { NotificationPublisherService } from '@api/notification/services/notification-publisher.service';
import { UserAvatarService } from '@api/user-avatar/user-avatar.service';
import { UserService } from '@api/user/services/user.service';
import { UserAvatar, UserSanction } from '@generated/prisma/client';
import { UserSanctionType } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { prismaMock } from '@libs/prisma/prisma.mock';
import { appDayjs } from '@libs/utils/dayjs.util';
import { partialMock } from '@libs/utils/mock-helper.util';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mock, mockReset } from 'jest-mock-extended';
import { UserSanctionDto } from './dto/user-sanction.dto';
import { UserSanctionService } from './user-sanction.service';

jest.mock('uuid', () => ({ v4: () => 'mock-uuid' }));

describe('UserSanctionService', () => {
	let service: UserSanctionService;
	const userService = mock<UserService>();
	const userAvatarService = mock<UserAvatarService>();
	const notificationPublisherService = mock<NotificationPublisherService>();

	const now = new Date();
	const sanction = partialMock<UserSanction>({
		id: 'sanction-1',
		userId: 'u1',
		reportId: 'rep1',
		createdById: 'admin1',
		startsAt: now,
		endsAt: appDayjs(now).add(1, 'hour').toDate(),
		type: UserSanctionType.AVATAR_CHANGE_BAN,
		createdAt: now,
		updatedAt: now,
	});

	beforeEach(async () => {
		mockReset(prismaMock);
		mockReset(userService);
		mockReset(userAvatarService);
		mockReset(notificationPublisherService);

		const moduleRef: TestingModule = await Test.createTestingModule({
			providers: [
				UserSanctionService,
				{ provide: PrismaService, useValue: prismaMock },
				{ provide: UserService, useValue: userService },
				{ provide: UserAvatarService, useValue: userAvatarService },
				{
					provide: NotificationPublisherService,
					useValue: notificationPublisherService,
				},
			],
		}).compile();

		service = moduleRef.get<UserSanctionService>(UserSanctionService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('findByUserId', () => {
		it('should return sanctions by user id', async () => {
			prismaMock.userSanction.findMany.mockResolvedValue([sanction]);

			const result = await service.findByUserId('u1');

			expect(prismaMock.userSanction.findMany).toHaveBeenCalledWith({
				where: { userId: 'u1' },
			});
			expect(result[0]).toBeInstanceOf(UserSanctionDto);
			expect(result[0]).toMatchObject({ id: 'sanction-1' });
		});
	});

	describe('findById', () => {
		it('should return sanction by id', async () => {
			prismaMock.userSanction.findUnique.mockResolvedValue(sanction);

			const result = await service.findById('sanction-1');

			expect(prismaMock.userSanction.findUnique).toHaveBeenCalledWith({
				where: { id: 'sanction-1' },
			});
			expect(result).toBeInstanceOf(UserSanctionDto);
			expect(result).toMatchObject({ id: 'sanction-1' });
		});

		it('should throw error if sanction not found', async () => {
			prismaMock.userSanction.findUnique.mockResolvedValue(null);

			await expect(service.findById('wrong-id')).rejects.toThrow(
				NotFoundException,
			);
		});
	});

	describe('create', () => {
		it('should create sanction and handle AVATAR_CHANGE_BAN', async () => {
			prismaMock.userSanction.findUnique.mockResolvedValue(null);
			prismaMock.userSanction.create.mockResolvedValue(sanction);

			prismaMock.userAvatar.findUnique.mockResolvedValue(
				partialMock<UserAvatar>({
					userId: 'u2',
					isDefault: false,
				}),
			);

			const endsAt = appDayjs(now).add(1, 'hour').toDate();

			const result = await service.create('u1', {
				targetUserId: 'u2',
				type: UserSanctionType.AVATAR_CHANGE_BAN,
				endsAt,
				startsAt: now,
				reportId: 'rep1',
			});

			expect(prismaMock.userSanction.create).toHaveBeenCalled();
			expect(prismaMock.userAvatar.findUnique).toHaveBeenCalledWith({
				where: { userId: 'u2' },
			});
			expect(userAvatarService.deleteAvatar).toHaveBeenCalledWith('u2');
			expect(result).toBeInstanceOf(UserSanctionDto);
			expect(result).toMatchObject({ id: 'sanction-1' });
		});

		it('should handle USERNAME_CHANGE_BAN and generate new username', async () => {
			prismaMock.userSanction.findUnique.mockResolvedValue(null);
			prismaMock.userSanction.create.mockResolvedValue({
				...sanction,
				type: UserSanctionType.USERNAME_CHANGE_BAN,
			});

			userService.generateUsername.mockResolvedValue('generated-username');

			await service.create('admin-1', {
				targetUserId: 'target-1',
				type: UserSanctionType.USERNAME_CHANGE_BAN,
				startsAt: now,
				endsAt: appDayjs(now).add(1, 'day').toDate(),
			});

			expect(userService.generateUsername).toHaveBeenCalled();
			expect(userService.update).toHaveBeenCalledWith(
				'target-1',
				{ username: 'generated-username' },
				true,
			);
		});

		it('should update existing sanction if it already exists', async () => {
			const existingEndsAt = appDayjs(now).add(1, 'day').toDate();
			const newEndsAt = appDayjs(now).add(2, 'days').toDate();

			prismaMock.userSanction.findUnique.mockResolvedValue(
				partialMock<UserSanction>({
					...sanction,
					endsAt: existingEndsAt,
				}),
			);

			prismaMock.userSanction.update.mockResolvedValue(
				partialMock<UserSanction>({
					...sanction,
					endsAt: newEndsAt,
				}),
			);

			await service.create('admin-1', {
				targetUserId: 'target-1',
				type: UserSanctionType.AVATAR_CHANGE_BAN,
				startsAt: now,
				endsAt: newEndsAt,
			});

			expect(prismaMock.userSanction.update).toHaveBeenCalledWith({
				where: {
					userId_type: {
						type: UserSanctionType.AVATAR_CHANGE_BAN,
						userId: 'target-1',
					},
				},
				data: { endsAt: newEndsAt },
			});
		});

		it('should throw error if start date is after end date', async () => {
			const dto = {
				targetUserId: 'target-1',
				type: UserSanctionType.AVATAR_CHANGE_BAN,
				startsAt: appDayjs(now).add(2, 'hour').toDate(),
				endsAt: appDayjs(now).add(1, 'hour').toDate(),
			};

			await expect(service.create('admin-1', dto)).rejects.toThrow(
				BadRequestException,
			);
		});

		it('should throw error if end date is in the past', async () => {
			const dto = {
				targetUserId: 'target-1',
				type: UserSanctionType.AVATAR_CHANGE_BAN,
				startsAt: appDayjs(now).subtract(2, 'hour').toDate(),
				endsAt: appDayjs(now).subtract(1, 'hour').toDate(),
			};

			await expect(service.create('admin-1', dto)).rejects.toThrow(
				BadRequestException,
			);
		});
	});

	describe('update', () => {
		it('should update sanction successfully', async () => {
			prismaMock.userSanction.findUnique.mockResolvedValue(sanction);
			const newEndsAt = appDayjs(now).add(2, 'hours').toDate();
			prismaMock.userSanction.update.mockResolvedValue({
				...sanction,
				endsAt: newEndsAt,
			});

			const result = await service.update(sanction.id, { endsAt: newEndsAt });

			expect(prismaMock.userSanction.update).toHaveBeenCalledWith({
				where: { id: sanction.id },
				data: { endsAt: newEndsAt },
			});
			expect(result).toBeInstanceOf(UserSanctionDto);
			expect(result.endsAt).toEqual(newEndsAt);
		});
	});

	describe('remove', () => {
		it('should remove sanction', async () => {
			prismaMock.userSanction.findUnique.mockResolvedValue(sanction);
			prismaMock.userSanction.delete.mockResolvedValue(sanction);

			await service.remove(sanction.id);

			expect(prismaMock.userSanction.delete).toHaveBeenCalledWith({
				where: { id: sanction.id },
			});
		});

		it('should throw error if removing non-existent sanction', async () => {
			prismaMock.userSanction.findUnique.mockResolvedValue(null);

			await expect(service.remove('s1')).rejects.toThrow(NotFoundException);
		});
	});
});
