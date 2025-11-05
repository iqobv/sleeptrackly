import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserSanctionType } from '@prisma/client';
import dayjs from 'dayjs';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { UserSanctionService } from './user-sanction.service';

const now = new Date();

const sanction = {
	id: 'sanction-1',
	userId: 'u1',
	reportId: 'rep1',
	createdById: 'admin1',
	startsAt: now,
	endsAt: new Date(now.getTime() + 1000 * 60 * 60),
	type: UserSanctionType.AVATAR_CHANGE_BAN,
	createdAt: now,
	updatedAt: now,
};

describe('UserSanctionService', () => {
	let service: UserSanctionService;
	let prisma: {
		userSanction: {
			findMany: jest.Mock;
			findUnique: jest.Mock;
			create: jest.Mock;
			update: jest.Mock;
			delete: jest.Mock;
		};
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

		const moduleRef: TestingModule = await Test.createTestingModule({
			providers: [
				UserSanctionService,
				{
					provide: PrismaService,
					useValue: prisma,
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

			await expect(service.findById('wrong-id')).rejects.toBeInstanceOf(
				NotFoundException,
			);
			await expect(service.findById('wrong-id')).rejects.toThrow(
				'Sanction not found',
			);
		});
	});

	describe('create', () => {
		it('should create sanction', async () => {
			prisma.userSanction.create.mockResolvedValue(sanction);

			const endsAt = new Date(now.getTime() + 1000 * 60 * 60);

			const result = await service.create('u1', {
				targetUserId: 'u2',
				type: UserSanctionType.AVATAR_CHANGE_BAN,
				endsAt,
				startsAt: now,
				reportId: 'rep1',
			});

			expect(prisma.userSanction.create).toHaveBeenCalledWith({
				data: {
					report: { connect: { id: 'rep1' } },
					user: { connect: { id: 'u2' } },
					createdBy: { connect: { id: 'u1' } },
					endsAt,
					startsAt: now,
					type: UserSanctionType.AVATAR_CHANGE_BAN,
				},
			});
			expect(result).toEqual(sanction);
		});

		it('should update existing sanction if it already exists and its endsAt is after dto.endsAt', async () => {
			const existingEndsAt = dayjs(now).add(5, 'day').toDate();
			const dtoEndsAt = dayjs(now).add(2, 'day').toDate();

			const dto = {
				targetUserId: 'target-1',
				type: UserSanctionType.AVATAR_CHANGE_BAN,
				startsAt: now,
				endsAt: dtoEndsAt,
				reportId: 'rep-1',
			};

			const existingSanction = {
				id: 's1',
				userId: 'target-1',
				createdById: 'admin-1',
				reportId: 'rep-1',
				startsAt: now,
				endsAt: existingEndsAt,
				type: UserSanctionType.AVATAR_CHANGE_BAN,
				createdAt: now,
				updatedAt: now,
			};

			jest
				.spyOn(service as any, 'findByTypeAndUserId')
				.mockResolvedValue(existingSanction);

			prisma.userSanction.update.mockResolvedValue({
				...existingSanction,
				endsAt: existingEndsAt,
			});

			const result = await service.create('admin-1', dto);

			expect(prisma.userSanction.update).toHaveBeenCalledWith({
				where: {
					userId_type: {
						type: UserSanctionType.AVATAR_CHANGE_BAN,
						userId: 'target-1',
					},
				},
				data: { endsAt: existingEndsAt },
			});

			expect(result.endsAt).toEqual(existingEndsAt);
		});

		it('should throw error if start date is after end date', async () => {
			const dto = {
				targetUserId: 'target-1',
				type: UserSanctionType.AVATAR_CHANGE_BAN,
				startsAt: new Date(now.getTime() + 1000 * 60 * 60),
				endsAt: now,
				reportId: 'rep-1',
			};

			const promise = service.create('admin-1', dto);

			await expect(promise).rejects.toBeInstanceOf(BadRequestException);
			await expect(promise).rejects.toThrow(
				'Start date must be before end date',
			);
		});

		it('should throw error if end date is in the past', async () => {
			const dto = {
				targetUserId: 'target-1',
				type: UserSanctionType.AVATAR_CHANGE_BAN,
				startsAt: new Date(now.getTime() - 1000 * 60 * 120),
				endsAt: new Date(now.getTime() - 1000 * 60 * 60),
				reportId: 'rep-1',
			};

			const promise = service.create('admin-1', dto);

			await expect(promise).rejects.toBeInstanceOf(BadRequestException);
			await expect(promise).rejects.toThrow('End date must be in the future');
		});
	});

	describe('update', () => {
		it('should update sanction', async () => {
			prisma.userSanction.findUnique.mockResolvedValue(sanction);

			const endsAt = new Date(now.getTime() + 1000 * 60 * 60);

			const dto = { endsAt };

			prisma.userSanction.update.mockResolvedValue({
				...sanction,
				endsAt,
			});

			const result = await service.update(sanction.id, dto);

			expect(prisma.userSanction.update).toHaveBeenCalledWith({
				where: { id: sanction.id },
				data: { endsAt },
			});
			expect(result).toEqual(sanction);
		});

		it('should throw error if sanction not found', async () => {
			prisma.userSanction.findUnique.mockResolvedValue(null);

			const dto = { endsAt: new Date(now.getTime() + 1000 * 60 * 60) };

			const promise = service.update('s1', dto);

			await expect(promise).rejects.toBeInstanceOf(NotFoundException);
			await expect(promise).rejects.toThrow('Sanction not found');
		});

		it('should throw error if end date is in the past', async () => {
			prisma.userSanction.findUnique.mockResolvedValue(sanction);

			const dto = { endsAt: new Date(now.getTime() - 1000 * 60 * 60) };

			const promise = service.update(sanction.id, dto);

			await expect(promise).rejects.toBeInstanceOf(BadRequestException);
			await expect(promise).rejects.toThrow('End date must be in the future');
		});
	});

	describe('remove', () => {
		it('should remove sanction', async () => {
			prisma.userSanction.findUnique.mockResolvedValue(sanction);

			await service.remove(sanction.id);

			expect(prisma.userSanction.delete).toHaveBeenCalledWith({
				where: { id: sanction.id },
			});
		});

		it('should throw error if sanction not found', async () => {
			prisma.userSanction.findUnique.mockResolvedValue(null);

			const promise = service.remove('s1');

			await expect(promise).rejects.toBeInstanceOf(NotFoundException);
			await expect(promise).rejects.toThrow('Sanction not found');
		});
	});
});
